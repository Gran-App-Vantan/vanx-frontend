"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RankingsItem } from "@/components/features/rankings";
import { ReturnButton } from "@/components/shared";
import { RankingsIndex, RankingItem } from "@/api/rankings";

export default function Rankings() {
  const [isScrolled, setIsScrolled] = useState(false); // スクロールしたかどうかの状態を管理
  const [myAccount, setMyAccount] = useState<RankingItem | null>(null);
  const [users, setUsers] = useState<RankingItem[]>([]);

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
          setMyAccount(response.data.myAccount);
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("ランキングデータの取得に失敗しました:", error);
      }
    }

    fetchRankings();
  }, []);

  console.log(users);

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
            {/* ユーザーアイコン */}
            <Image
              src="/icons/default-user-icon.svg"
              alt="default-user-icon"
              width={48}
              height={48}
            />
            <p className="text-text-color text-text-normal">じゅんぺいちゃん</p> {/* ユーザー名 */}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-text-color text-h1">100位</p> {/* ランキング */}
          </div>
        </div>  
      </div>
      <ul className="flex flex-col gap-4 mt-55">
          {users.map((user, i) => (
            <li key={user.id}>
              <RankingsItem
                rank={i + 1}
                name={user.name}
                userIcon={user.userIcon}
                point={user.point}
              />
            </li>
          ))}
      </ul>
    </main>
  );
}
