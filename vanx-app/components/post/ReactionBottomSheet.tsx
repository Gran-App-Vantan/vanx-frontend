"use client";

import Image from "next/image";
import { useState } from "react";

const navigationItems = [
  {
    src: "./icons/all-icon.svg", 
    alt: "all-icon" 
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon"
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon"
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon"
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon"
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon"
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon"
  },
]

// 仮データの皆さん
const reactionIcons = [
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon"
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon"
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon"
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon"
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon"
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon"
  },
]

export function ReactionBottomSheet() {
  const [navClicked, setNavClicked] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full min-w-screen h-[330px] bg-base py-5 rounded-tr-xl rounded-tl-xl shadow-top">

      <span className="block w-15 min-h-1 bg-text-gray rounded-full mx-auto"/>

      <div className="flex w-[358px] bg-gray px-4 mx-auto rounded-lg gap-4">
        <Image 
          className="cursor-pointer"
          src="/icons/search-icon.svg"
          alt="search-icon"
          width={24}
          height={24}
        />
        <input
          className="w-full h-10 text-text outline-none"
          type="text"
          placeholder="絵文字を検索する"
          autoComplete="off"
        />
      </div>

      <nav>
        <ul className="flex justify-between px-[30px]">
          {navigationItems.map((item, i) => (
            <li key={i}>
              <button 
                className="py-[2px] px-[10px] rounded cursor-pointer"
                style={{
                  background: navClicked ? "var(--gray-color)" : "var(--base-color)",
                }}
                onClick={() => setNavClicked(!navClicked)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={24}
                  height={24}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div>
        {reactionIcons.map((icon, i) => (
          <span key={i}>
            <Image 
              src={icon.src}
              alt={icon.alt}
              width={30}
              height={30}
            />
          </span>
        ))}
      </div>
      
    </div>
  );
}