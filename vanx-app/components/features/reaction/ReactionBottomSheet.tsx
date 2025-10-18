"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import { SearchIcon } from "@/components/shared/icons";
import { ReactionData, Reaction } from "@/api/reaction";
import { ReactionIndex, toggleReaction, ToggleReactionResponse } from "@/api/reaction";

type ReactionBottomSheetProps = {
  reactionData: ReactionData | null;
  isOpen: boolean;
  onCloseAnimationEnd: () => void;
  postId: number;
};

const navigationItems = [
  {
    src: "/icons/all-icon.svg",
    alt: "all-icon",
    reactionType: "all" as const,
  },
  {
    src: "/icons/emoji-icon.svg",
    alt: "emoji-icon",
    reactionType: "emoji" as const,
  },
  {
    src: "/icons/nature-icon.svg",
    alt: "nature-icon",
    reactionType: "nature" as const,
  },
  {
    src: "/icons/food-icon.svg",
    alt: "food-icon",
    reactionType: "food" as const,
  },
  {
    src: "/icons/activity-icon.svg",
    alt: "activity-icon",
    reactionType: "activity" as const,
  },
  {
    src: "/icons/travel-icon.svg",
    alt: "travel-icon",
    reactionType: "travel" as const,
  },
  {
    src: "/icons/symbols-icon.svg",
    alt: "symbols-icon",
    reactionType: "symbol" as const,
  },
];

export function ReactionBottomSheet({
  reactionData,
  isOpen,
  onCloseAnimationEnd,
  postId,
}: ReactionBottomSheetProps) {
  const [isReacted, setIsReacted] = useState(false);
  const [reactions, setReactions] = useState<Reaction[] | null>(reactionData?.data || null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(reactionData?.nextPageUrl || null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [navClicked, setNavClicked] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(isOpen);
  const [animClass, setAnimClass] = useState("anim-slidein");

  console.log(reactions);

  const handleToggleReaction = async (reactionId: number) => {
    try {
      const response = await toggleReaction({ reactionId, postId });

      if (response.success) {
        if ("action" in response && response.action === "created") {
          setIsReacted(true);
        } else if ("action" in response && response.action === "deleted") {
          setIsReacted(false);
        }
      }
    } catch (error) {
      console.error("リアクションの切り替えに失敗しました:", error);
    }
  }

  const handleCategoryChange = async (
    item: typeof navigationItems[0],
    index: number
  ) => {
    setNavClicked(index);
    setSelectedCategory(item.reactionType);
    setCurrentPage(1);
    setLoading(true);

    try {
      const response = await ReactionIndex({
        category: item.reactionType,
        page: 1,
      });

      if (response.success) {
        setReactions(response.reactions.data);
        setNextPageUrl(response.reactions.nextPageUrl);
      } else {
        console.error("ERROR: ", response.messages);
        setReactions([]);
        setNextPageUrl(null);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      setReactions([]);
      setNextPageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreReactions = async () => {
    if (loading || !nextPageUrl) return;

    setLoading(true);

    try {
      const currentReactionType = navigationItems[navClicked].reactionType;
      const nextPage = currentPage + 1;

      const response = await ReactionIndex({
        category: currentReactionType,
        page: nextPage,
      })

      if (response.success) {
        setReactions(prev => prev ? [...prev, ...response.reactions.data] : response.reactions.data);
        setNextPageUrl(response.reactions.nextPageUrl);
        setCurrentPage(nextPage);
      } else {
        console.error("ERROR: ", response.messages);
        setNextPageUrl(null);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      setNextPageUrl(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setReactions(reactionData?.data || null);
  }, [reactionData]);

  useEffect(() => {
    if (!observerRef.current || !nextPageUrl || loading || searchValue) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchMoreReactions();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [nextPageUrl, loading, searchValue, navClicked]);

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
    (icon) => icon.reactionType === selectedCategory || selectedCategory === "all"
  ) || [];

  const filteredResults = useMemo(() => {
    if (!searchValue) return [];

    return reactions?.filter(
      (item) =>
        (item.reactionType === selectedCategory || selectedCategory === "all") &&
        item.reactionName.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];
  }, [searchValue, selectedCategory, reactions]);

  console.log(filteredResults, filteredIcons);

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
                  onClick={() => handleCategoryChange(item, i)}
                  disabled={loading}
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
              ? "grid grid-cols-[repeat(8,30px)] auto-rows-[30px]"
              : filteredIcons.length > 0
                ? "grid grid-cols-[repeat(8,30px)] auto-rows-[30px]"
                : "flex justify-center items-center"
          }
        `}
      >
        {searchValue ? (
          filteredResults.length > 0 ? (
            filteredResults.map((icon, i) => (
              <button 
                key={`${icon.id || i}`} 
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={() => handleToggleReaction(icon.id)}
              >
                <Image 
                  src={icon.reactionImage} 
                  alt={icon.reactionName} 
                  width={30} 
                  height={30} 
                />
              </button>
            ))
          ) : (
            <div className="col-span-8 flex flex-col justify-center items-center min-h-[240px] text-center text-text-gray">
              <p>リアクションが見つかりませんでした🧐</p>
              <p>他のキーワードでお試しください</p>
            </div>
          )
        ) : filteredIcons.length > 0 ? (
          <>
            {filteredIcons.map((icon, i) => (
              <button 
                key={`${icon.id || i}`} 
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={() => handleToggleReaction(icon.id)}
              >
                <Image 
                  src={icon.reactionImage} 
                  alt={icon.reactionName} 
                  width={30} 
                  height={30} 
                />
              </button>
            ))}
            
            {nextPageUrl && !searchValue && (
              <div 
                ref={observerRef} 
                className="col-span-8 h-10 flex items-center justify-center"
              >
                {loading && (
                  <p className="text-sm text-text-gray">読み込み中...</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="col-span-8 flex justify-center items-center min-h-[240px] text-center text-text-gray">
            {loading ? "読み込み中..." : "リアクションが見つかりません"}
          </div>
        )}
      </div>
    </div>
  );
}
