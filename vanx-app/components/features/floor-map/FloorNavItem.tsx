"use client";

import Image from "next/image";
import { useState } from "react";
import { FloorMapCard } from "@/components/features/floor-map";
import { ReturnButton } from "@/components/shared";

type Props = {
  floors: string[];
  // imgSrc: string;
};

const floorsDefault = [
  "w-17",
  "h-8",
  "bg-accent-light",
  "text",
  "font-normal",
  "shadow-bottom",
  "text-center",
  "rounded",
  "my-8",
];
const floorsActive = [
  "w-17",
  "h-8",
  "bg-accent",
  "text-white",
  "font-normal",
  "shadow-bottom",
  "text-center",
  "src-[map-detail-image.png]",
  "rounded",
  "my-8",
];

export function FloorNavItem({ floors }: Props) {
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
    <>
      <ReturnButton />
      <div className="relative w-full h-screen">
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

        <div className="flex justify-center fixed bottom-0 left-1/2 -translate-x-1/2  bg-white  shadow-top w-full">
          <div className="flex gap-2">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => handleClick(floor)}
                className={`${
                  isActive === floor
                    ? floorsActive.join(" ")
                    : floorsDefault.join(" ")
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
