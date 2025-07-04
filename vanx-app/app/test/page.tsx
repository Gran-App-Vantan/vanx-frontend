"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/post";
import { useState, useEffect, useRef } from "react";

// 仮データの皆さん
const postInfo = {
  id: 1,
  userId: "junpeichan@0310",
  userName: "じゅんぺいちゃん",
  imageSrc: "/icons/user-icon.svg",
  contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",

  postReactions: [
    {
      id: 1,
      category: "emoji" as const,
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
    }
  ]
}

export default function Test() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBottomSheetOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target as Node)
      ) {
        setIsBottomSheetOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBottomSheetOpen]);

  return (
    <main>
      <PostItem 
        post={postInfo}
        onDelete={() => setIsDeleteModalOpen(true)}
        onClick={() => setIsBottomSheetOpen(true)}
      />

      {isDeleteModalOpen && (
        <>
          {/* 
            <Modal>
              <PostDeleteModal />
            </Modal> 
          */}
        </>
      )}

      {isBottomSheetOpen && (
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-[#9A9A9A]/50 flex items-end"
          onClick={() => setIsBottomSheetOpen(false)}
        >
          <div
            ref={bottomSheetRef}
            onClick={(e) => e.stopPropagation()}
          >
            <ReactionBottomSheet />
          </div>
        </div>
      )}
    </main>
  );
}