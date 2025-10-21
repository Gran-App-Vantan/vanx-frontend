"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LeftArrowIcon } from "@/components/shared/icons";
import { PointLogItem } from "@/components/features/wallet";
import { useUser } from "@/contexts/UserContext";
import { WalletIndex, WalletData } from "@/api/wallet";

const switchButtons = ["すべて", "獲得ポイント", "損失ポイント"];

export default function Wallet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const { user } = useUser();

  const filteredWalletData = walletData?.data?.filter((wallet) => {
    
  });

  useEffect(() => {
    const fetchWalletIndex = async () => {
      try {
        const response = await WalletIndex({ filter: "all" });

        if (response.success) {
          setWalletData(response.data.pointlogs);
        }
      } catch (error) {
        console.error("ウォレット情報の取得に失敗しました。", error);
      }
    };
    fetchWalletIndex();
  }, []);

  // ユーザーのポイントをカンマ区切りでフォーマット
  const userPoint = user?.point
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "P";

  console.log(walletData?.data);

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
                {button}
              </button>
            );
          })}
        </div>
        <ul>
          {filteredWalletData.map((wallet, i) => {
            return (
              <li key={i}>
                <PointLogItem
                  time={wallet.time}
                  boothName={wallet.name}
                  point={wallet.point}
                  isPuls={wallet.isPuls}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
