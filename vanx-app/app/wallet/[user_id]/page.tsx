"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LeftArrowIcon } from "@/components/shared/icons";
import { PointLogItem } from "@/components/features/wallet";

const switchButtons = [
  "すべて",
  "獲得ポイント",
  "損失ポイント"
];

// テスト用データ
const testItems = [
  {
    time: "06/05 10:01",
    name: "インディアンポーカー",
    point: 80000,
    isPuls: false,
  },
  {
    time: "06/05 10:11",
    name: "ルーレット",
    point: 500,
    isPuls: true,
  },
]

//
// ユーザーの情報の取得ができていないので、一旦仮データを配置してUIを作成しています
//

export default function Wallet() {
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = testItems.filter((item) => {
    if (activeIndex === 1) return item.isPuls;    // ポイントがプラスの場合
    if (activeIndex === 2) return !item.isPuls;   // ポイントがマイナスの場合
    return true;                                  // すべての場合
  });

  return (
    <main>
      <div className="w-screen bg-accent-light text-text shadow-bottom rounded-br-xl rounded-bl-xl">
        <div className="p-4">
          <Link href="/" className="flex gap-2.5 items-center w-20 text-label">
            <LeftArrowIcon  color="black"/>
            戻る
          </Link>
          <div className="flex items-center gap-8 mt-4 text-normal">
            <Image
              src="/icons/default-user-icon.svg"
              alt="default-user-icon"
              width={50}
              height={50}
            /> {/* userIcon */}
            <p>じゅんぺいちゃん</p> {/* name */}
          </div>
        </div>
        <div className="mt-12 bg-accent text-white py-4 px-6 rounded-br-xl rounded-bl-xl">
          <p className="text-label mb-2">現在のポイント</p>
          <p className="text-h1">1,000P</p> {/* point */}
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
                  ${activeIndex === i
                    ? "text-text border-b-2 border-b-accent"
                    : "text-text-gray"
                  }
                  w-24 py-4 box-border cursor-pointer
                `}
              >
                {button}
              </button>
            );
          })}
        </div>
        <ul>
          {filteredItems.map((item, i) => {
            return (
              <li key={i}>
                <PointLogItem
                  time={item.time}
                  boothName={item.name}
                  point={item.point}
                  isPuls={item.isPuls}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
