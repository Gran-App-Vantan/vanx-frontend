"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RankingsItem } from "@/components/features/rankings";
import { ReturnButton } from "@/components/shared";

export default function Rankings() {
  const [isScrolled, setIsScrolled] = useState(false); // スクロールしたかどうかの状態を管理

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // スクロール量を取得
      setIsScrolled(scrollTop > 100); // 100px以上スクロールしたらスタイル変更
    };

    window.addEventListener('scroll', handleScroll);  // スクロールイベントを追加
    return () => window.removeEventListener('scroll', handleScroll);  // スクロールイベントを削除
  }, []);
  
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
        {[...Array(11)].map((_, index) => (
          <RankingsItem 
            key={index}
            rank={index + 1} // ランキングの順位
            icon={"/icons/default-user-icon.svg"} // ユーザーアイコン
            name={`ユーザー${index + 1}`} // ユーザー名
            score={(20 - index) * 10} // ポイント
          />
        ))}
      </ul>
    </main>
  );
}
