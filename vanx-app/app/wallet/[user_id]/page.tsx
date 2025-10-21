"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { LeftArrowIcon } from "@/components/shared/icons";
import { PointLogItem } from "@/components/features/wallet";
import { useUser } from "@/contexts/UserContext";
import { WalletIndex, WalletData } from "@/api/wallet";

const switchButtons = [
  {
    text: "すべて", 
    category: "all"
  },
  {
    text: "獲得ポイント", 
    category: "plus"
  },
  {
    text: "損失ポイント", 
    category: "minus"
  }
];

export default function Wallet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  const fetchMoreWalletData = async () => {
    if (loading || !nextPageUrl) return;

    setLoading(true);

    try {
      const currentCategory = switchButtons[activeIndex].category;
      const nextPage = currentPage + 1;

      const response = await WalletIndex({
        filter: currentCategory, 
        page: nextPage 
      });

      if (response.success) {
        setWalletData(prev => {
          if (!prev) return response.data.pointlogs;
          
          return {
            ...response.data.pointlogs,
            data: [...prev.data, ...response.data.pointlogs.data]
          };
        });
        setCurrentPage(nextPage);
        setNextPageUrl(response.data.pointlogs.nextPageUrl);
      }
    } catch (error) {
      console.error("追加データの取得に失敗しました。", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredWalletData = walletData?.data?.filter((wallet) => {
    if (activeIndex === 1) return wallet.type === "plus"; // 獲得ポイントの場合
    if (activeIndex === 2) return wallet.type === "minus"; // 損失ポイントの場合
    return true; // すべての場合
  });

  // ユーザーのポイントをカンマ区切りでフォーマット
  const userPoint = user?.point
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "P";

  useEffect(() => {
    const fetchWalletIndex = async () => {
      try {
        const response = await WalletIndex({ filter: "all" });

        if (response.success) {
          setWalletData(response.data.pointlogs);
          setCurrentPage(response.data.pointlogs.currentPage);
          setNextPageUrl(response.data.pointlogs.nextPageUrl);
        }
      } catch (error) {
        console.error("ウォレット情報の取得に失敗しました。", error);
      }
    };
    fetchWalletIndex();
  }, []);

  useEffect(() => {
    if (!observerRef.current || !nextPageUrl || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchMoreWalletData();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentObserverRef = observerRef.current;
    observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
      observer.disconnect();
    };
  }, [nextPageUrl, loading, activeIndex]);

  return (
    <main>
      <div className="w-screen bg-accent-light text-text shadow-bottom rounded-br-xl rounded-bl-xl">
        <div className="p-4">
          <Link href="/" className="flex gap-2.5 items-center w-20 text-label">
            <LeftArrowIcon color="black" />
            戻る
          </Link>
          <div className="flex items-center gap-8 mt-4 text-normal">
            <Image
              src={user?.userIcon || "/icons/default-user-icon.svg"}
              alt="user-icon"
              width={50}
              height={50}
            />
            <p>{user?.name}</p>
          </div>
        </div>
        <div className="mt-12 bg-accent text-white py-4 px-6 rounded-br-xl rounded-bl-xl">
          <p className="text-label mb-2">現在のポイント</p>
          <p className="text-h1">{userPoint || 0}</p>
        </div>
      </div>
      <div className="mt-10">
        <div className="w-full flex justify-around items-center border-b-[0.5px] border-b-text-gray text-label">
          {switchButtons.map((button, i) => {
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  ${
                    activeIndex === i
                      ? "text-text border-b-2 border-b-accent"
                      : "text-text-gray"
                  }
                  w-24 py-4 box-border cursor-pointer
                `}
              >
                {button.text}
              </button>
            );
          })}
        </div>
        <ul>
          {filteredWalletData?.map((wallet) => {
            return (
              <li key={wallet.id}>
                <PointLogItem
                  serviceName={wallet.serviceName}
                  pointAmount={wallet.pointAmount}
                  type={wallet.type}
                  date={wallet.date}
                  time={wallet.time}
                />
              </li>
            );
          })}
        </ul>

        {nextPageUrl && (
          <div ref={observerRef} className="h-10 flex justify-center items-center">
            {loading && <p className="text-text-gray text-label">読み込み中...</p>}
          </div>
        )}
      </div>
    </main>
  );
}
