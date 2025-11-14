"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RankingsItem } from "@/components/features/rankings";
import { ReturnButton } from "@/components/shared";
import { RankingsIndex, RankingItem } from "@/api/rankings";
import { useAuth } from "@/hooks/useAuth";

export default function Rankings() {
  useAuth(); // 認証チェック
  const [isScrolled, setIsScrolled] = useState(false); // スクロールしたかどうかの状態を管理
  const [myAccount, setMyAccount] = useState<RankingItem | null>(null);
  const [users, setUsers] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreRankings = async () => {
    if (loading || !nextPageUrl) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;

      const response = await RankingsIndex({ page: nextPage });

      if (response.success) {
        setUsers((prev) => [...prev, ...response.data.users.data]);
        setNextPageUrl(response.data.users.nextPageUrl);
        setCurrentPage(nextPage);
      } else {
        console.error("ERROR: ", response.message);
      }
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // スクロール量を取得
      setIsScrolled(scrollTop > 100); // 100px以上スクロールしたらスタイル変更
    };

    window.addEventListener('scroll', handleScroll);  // スクロールイベントを追加
    return () => window.removeEventListener('scroll', handleScroll);  // スクロールイベントを削除
  }, []);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await RankingsIndex({ page: 1});

        if (response.success) {
          console.log(response.data);
          setMyAccount(response.data.myAccount);
          setUsers(response.data.users.data);
          setNextPageUrl(response.data.users.nextPageUrl);
        }
      } catch (error) {
        console.error("ランキングデータの取得に失敗しました:", error);
      }
    }

    fetchRankings();
  }, []);

  useEffect(() => {
    if (!observerRef.current || !nextPageUrl || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchMoreRankings();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef, nextPageUrl, loading]);

  return (
    <main>
      <div className="fixed top-0 w-full z-10">
        <ReturnButton />
        <div 
          className={`
            flex items-center justify-center bg-accent-light w-full mt-16 z-10 shadow-bottom transition-all duration-300 
            ${isScrolled 
              ? 'flex-row gap-4 h-20'
              : 'flex-col h-34'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="relative w-[48px] h-[48px]">
              <Image
                fill
                className="object-cover rounded-full border-[0.5px] border-text-gray"
                src={myAccount?.userIcon || "/icons/default-user-icon.svg"}
                alt={myAccount?.name || "user-icon"}
              />
            </div>
            <p className="text-text-color text-text-normal">{myAccount?.name || "ユーザー名"}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-text-color text-h1">100位</p> {/* TODO: myAccountにユーザーのランキングを追加 */}
          </div>
      </div>  
    </div>
    <ul className="flex flex-col gap-4 mt-55">
        {users.map((user, i) => (
          <li key={`${user.id}-${i}`}>
            <RankingsItem
              rank={i + 1}
              name={user.name}
              userIcon={user.userIcon}
              point={user.point}
            />
          </li>
        ))}
    </ul>      

    <div ref={observerRef} className="h-10 w-full" />
    
    {loading && (
      <div className="flex justify-center items-center py-4">
        <p className="text-text-color">読み込み中...</p>
      </div>
    )}
    </main>
  );
}
