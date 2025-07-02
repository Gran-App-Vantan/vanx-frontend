"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

const navigationItems = [
  {
    src: "./icons/all-icon.svg", 
    alt: "all-icon",
    category: "",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
  },
]

// 仮データの皆さん
const reactionIcons = [
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    category: "emoji",
    name: "平常心",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    category: "nature",
    name: "葉っぱ",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    category: "food",
    name: "ジャンクフード",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    category: "activity",
    name: "コントローラー",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    category: "travel",
    name: "飛行機",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    category: "symbols",
    name: "ハート",
  },
]

export function ReactionBottomSheet() {
  const [navClicked, setNavClicked] = useState(0);
  const [reactionCategory, setReactionCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const filteredIcons = reactionIcons.filter(
    (icon) => icon.category === reactionCategory || reactionCategory === ""
  );

  const filteredResults = useMemo(() => {
    if (!searchValue) return [];

    return reactionIcons.filter(item => 
      (item.category === reactionCategory || reactionCategory === "") &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#9A9A9A]/50">
      <div className="absolute bottom-0 flex flex-col gap-6 w-full min-w-screen bg-base py-5 rounded-tr-xl rounded-tl-xl shadow-top">
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
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <nav className="border-b-[0.5px] border-text-gray py-2">
          <ul className="flex items-center justify-between px-[30px]">
            {navigationItems.map((item, i) => {
              const isClicked = navClicked === i;

              return (
                <li key={i}>
                  <button
                    className={`
                      py-[2px] px-[10px] rounded cursor-pointer
                      ${isClicked ? "bg-gray" : "bg-base"}
                    `}
                    onClick={() => {
                      setNavClicked(i);
                      setReactionCategory(item.category || "");
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={24}
                      height={24}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid grid-cols-8 grid-rows-[30px_30px] mx-auto h-60 gap-[15px] overflow-y-scroll">
          {filteredResults.length > 0 ? (
            filteredResults.map((icon, i) => (
              <span
                key={i}
                className="w-[30px] h-[30px]"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={30}
                  height={30}
                />
              </span>
            ))
          ) : (
            filteredIcons.map((icon, i) => (
              <span
                key={i}
                className="w-[30px] h-[30px]"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={30}
                  height={30}
                />
              </span>
            ))
          )}
        </div>

      </div>
    </div>
  );
}