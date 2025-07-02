"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/post";
import { useState } from "react";

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
        <ReactionBottomSheet />
      )}
    </main>
  );
}