"use client";

import { PostItem, ReactionBottomSheet } from "@/components/post";
import { FooterNavItem } from "@/components/shared";
import { useState } from "react";

// 仮データの皆さん
const commonUser = {
  userId: "junpeichan@0310",
  userName: "じゅんぺいちゃん",
  imageSrc: "/icons/user-icon.svg",
};

const commonReaction = {
  reactionName: "平常心",
  reactionImageSrc: "/icons/reaction-icon.svg",
  category: "emoji" as const,
};

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
              )
            })}
          </ul>

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
            <ReactionBottomSheet />
          )}
        </div>
      </main>

      <FooterNavItem />
    </>
  )
}