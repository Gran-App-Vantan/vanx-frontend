"use client";

import Image from "next/image";
import { useState } from "react";
import { FloorMapCard, FloorNavItem } from "@/components/features/floor-map";
import { ReturnButton } from "@/components/shared";

const floors = [2, 3, 4, 5, 6].map((num) => `${num}F`); // フロアの配列

export default function FloorMap() {
  const [isActive, setIsActive] = useState<string | null>(floors[0]);

  const handleClick = (floor: string) => {
    setIsActive(floor);
  };

  const defaultImage = (floor: string | null) => {
    if (!floor) return "/map-detail-image.png";

    // 末尾の "F" を除去するなど、キーを揃える
    const floorKey = floor.replace(/[^0-9]/g, "");
    const floorImages: Record<string, string> = {
      "2": "/map-detail-image.png",
      "3": "/icon.png",
      "4": "/floor-4.png",
      "5": "/floor-5.png",
      "6": "/floor-6.png",
    };

    return floorImages[floorKey] || "/map-detail-image.png";
  };

  return (
    <main>
      <ReturnButton />
      <div className="relative w-full pt-16 pb-24">
        <div className="w-full h-[370px]">
          <div className="h-[370px] flex-shrink-0">
            <Image
              src={defaultImage(isActive)}
              width={408}
              height={370}
              alt="floor-image"
              className="w-full h-[370px] object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center items-center max-h-[370px] min-h-[370px]">
          <FloorMapCard
            boothName="ブース名"
            boothText="このブースの紹介文が入ります。"
            gradeFaculty="学年・学科"
            boothImageText="ルールを見る→"
            bgImg="/map-detail-image.png"
            altText="画像説明"
          />
        </div>
      </div>
      <FloorNavItem
        floors={floors}
        isActive={isActive}
        onClick={handleClick}
      />
    </main>
  );
}
