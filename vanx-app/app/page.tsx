"use client";

import { PostItem, ReactionBottomSheet, PostDeleteModal } from "@/components/features/post";
import { FooterNavItem, Modal } from "@/components/shared";
import { useState, useEffect, useRef } from "react";
import { FloorNavItem } from "@/components/shared";

// 仮データ（ユーザー情報）
const commonUser = {
  userId: "junpeichan@0310",
  userName: "じゅんぺいちゃん",
  imageSrc: "/icons/user-icon.svg",
};

// 仮データ（リアクション情報）
const commonReaction = {
  reactionName: "平常心",
  reactionImageSrc: "/icons/reaction-icon.svg",
  category: "emoji" as const,
};

// 投稿一覧（仮データで5件分作成）
const posts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  ...commonUser,
  contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
  postReactions: [
    {
      id: i + 1,
      ...commonReaction,
    },
  ],
}));

export default function Home() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBottomSheetOpen) {
      setIsBottomSheetVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBottomSheetOpen]);

  const handleCloseAnimationEnd = () => {
    setIsBottomSheetVisible(false);
  };
  
  return (
    <>
      <main>
        <div className="absolute top-24">
          <ul>
            {posts.map((post) => {
              const normalizedPost = {
                ...post,
                contents: post.contents ?? "",
              };

              return (
                <li key={post.id}>
                  <PostItem 
                    post={normalizedPost}
                    onDelete={() => setIsDeleteModalOpen(true)}
                    onClick={() => setIsBottomSheetOpen(true)}
                  />
                </li>
              );
            })}
          </ul>

          {isDeleteModalOpen && (
            <Modal
              size="normal"
              openModal={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
            >
              <PostDeleteModal onClose={() => setIsDeleteModalOpen(false)} />
            </Modal> 
          )}

        {isBottomSheetVisible && (
          <div 
            className="fixed top-0 left-0 w-screen h-screen bg-[#9A9A9A]/50 flex items-end z-50"
            onClick={() => setIsBottomSheetOpen(false)}
          >
            <div
              ref={bottomSheetRef}
              onClick={(e) => e.stopPropagation()}
            >
              <ReactionBottomSheet 
                isOpen={isBottomSheetOpen}
                onCloseAnimationEnd={handleCloseAnimationEnd}
              />
            </div>
          </div>
        )}
        </div>
      </main>

      <FooterNavItem />
    </>
  );
}