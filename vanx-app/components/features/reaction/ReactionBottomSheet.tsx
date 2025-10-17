"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "@/components/shared/icons";
import { ReactionData } from "@/api/reaction";

type ReactionBottomSheetProps = {
  reactionData: ReactionData | null;
  isOpen: boolean;
  onCloseAnimationEnd: () => void;
}

const navigationItems = [
  {
    src: "./icons/all-icon.svg",
    alt: "all-icon",
    reactionType: "",
  },
  {
    src: "./icons/emoji-icon.svg",
    alt: "emoji-icon",
    reactionType: "emoji",
  },
  {
    src: "./icons/nature-icon.svg",
    alt: "nature-icon",
    reactionType: "nature",
  },
  {
    src: "./icons/food-icon.svg",
    alt: "food-icon",
    reactionType: "food",
  },
  {
    src: "./icons/activity-icon.svg",
    alt: "activity-icon",
    reactionType: "activity",
  },
  {
    src: "./icons/travel-icon.svg",
    alt: "travel-icon",
    reactionType: "travel",
  },
  {
    src: "./icons/symbols-icon.svg",
    alt: "symbols-icon",
    reactionType: "symbols",
  },
];

export function ReactionBottomSheet({
  reactionData,
  isOpen,
  onCloseAnimationEnd,
}: ReactionBottomSheetProps) {
  const [navClicked, setNavClicked] = useState(0);
  const [reactionreactionType, setReactionreactionType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(isOpen);
  const [animClass, setAnimClass] = useState("anim-slidein");

  const reactions = reactionData?.data || [];

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimClass("anim-slidein");
    } else {
      setAnimClass("anim-slideout");

      const timer = setTimeout(() => {
        setVisible(false);
        onCloseAnimationEnd();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onCloseAnimationEnd]);

  if (!visible) return null;

  const filteredIcons = reactions?.filter(
    (icon) => icon.reactionType === reactionreactionType || reactionreactionType === ""
  );

  const filteredResults = useMemo(() => {
    if (!searchValue) return [];

    return reactions?.filter(
      (item) =>
        (item.reactionType === reactionreactionType || reactionreactionType === "") &&
        item.reactionName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, reactionreactionType]);

  return (
    <div
      className={`
        absolute bottom-0 flex flex-col gap-6 w-full min-w-screen bg-white pt-5 pb-10 rounded-tr-xl rounded-tl-xl shadow-top
        ${animClass}
      `}
    >
      <span className="block w-15 min-h-1 bg-text-gray rounded-full mx-auto" />

      <div className="flex items-center w-[358px] bg-gray px-4 mx-auto rounded-lg gap-4">
        <SearchIcon className="cursor-pointer" />
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
          {navigationItems?.map((item, i) => {
            const isClicked = navClicked === i;

            return (
              <li key={i}>
                <button
                  className={`
                    py-[2px] px-[10px] rounded cursor-pointer
                    ${isClicked ? "bg-gray" : "bg-white"}
                  `}
                  onClick={() => {
                    setNavClicked(i);
                    setReactionreactionType(item.reactionType || "");
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

      <div
        className={`
          mx-auto h-60 min-h-[240px] gap-[15px] overflow-y-scroll
          ${
            searchValue
              ? "grid grid-cols-8 grid-rows-[30px_30px]"
              : filteredIcons.length > 0
                ? "grid grid-cols-8 grid-rows-[30px_30px]"
                : "flex justify-center items-center"
          }
        `}
      >
        {searchValue ? (
          filteredResults.length > 0 ? (
            filteredResults.map((icon, i) => (
              <span key={i} className="w-[30px] h-[30px]">
                <Image 
                  src={icon.reactionImage} 
                  alt={icon.reactionName} 
                  width={30} 
                  height={30} 
                />
              </span>
            ))
          ) : (
            <div className="col-span-8 flex flex-col justify-center items-center min-h-[240px] text-center text-text-gray">
              <p>リアクションが見つかりませんでした🧐</p>
              <p>他のキーワードでお試しください</p>
            </div>
          )
        ) : filteredIcons.length > 0 ? (
          filteredIcons.map((icon, i) => (
            <span key={i} className="w-[30px] h-[30px]">
              <Image 
                src={icon.reactionImage} 
                alt={icon.reactionName} 
                width={30} 
                height={30} 
              />
            </span>
          ))
        ) : (
          <div className="col-span-8 flex justify-center items-center min-h-[240px] text-center text-text-gray">
            リアクションが見つかりません
          </div>
        )}
      </div>
    </div>
  );
}
