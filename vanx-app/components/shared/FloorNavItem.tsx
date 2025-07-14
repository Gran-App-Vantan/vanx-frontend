"use client";

import Image from "next/image";
import { useState } from "react";
import { FloorMapCard } from "./FloorMapCard";

type Props = {
    floors: number[];
    // imgSrc: string;
}

 const floorsDefault = ["w-17", "h-8", "bg-accent-light", "text", "font-normal", "shadow-bottom", "text-center", "rounded", "my-8"];
 const floorsActive = ["w-17", "h-8", "bg-accent", "base", "font-normal", "shadow-bottom", "text-center", "src-[map-detail-image.png]", "rounded", "my-8"];

export function FloorNavItem({floors}: Props) {
    const [isActive, setIsActive] = useState<number | null>(null);

    const handleClick = (floor: number) => {
        setIsActive(floor);
    };

    const defaultImage = (floor: number | null) => {
        if (!floor) return "/map-detail-image.png";
    
        const floorImages: Record<string, string> = {
            '2': '/map-detail-image.png',
            '3': '/icon.png',
            '4': '/floor-4.png',
            '5': '/floor-5.png',
            '6': '/floor-6.png',
        };
    
        return floorImages[floor.toString()] || "/map-detail-image.png";
    };

    return (
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
          
          <div className="absolute bottom-0 left-0 right-0 shadow-top bg-white">
            <div className="flex justify-center py-4">
              <div className="flex gap-2">
                {floors.map((floor) => (
                  <button
                    key={floor}
                    onClick={() => handleClick(floor)}
                    className={`${
                      isActive === floor ? floorsActive.join(" ") : floorsDefault.join(" ")
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}