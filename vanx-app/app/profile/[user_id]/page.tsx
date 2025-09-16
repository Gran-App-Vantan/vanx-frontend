"use client";

import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/shared";
import { ReturnButton } from "@/components/shared";
import { ProfileHead } from "@/components/features/profile/ProfileHead";
import { posts } from "@/app/page";
import {
  PostItem,
  ReactionBottomSheet,
  PostDeleteModal,
} from "@/components/features/post";

//
// ユーザー情報の取得ができていないので、仮でpostsを表示しています
//

export default function Profile() {
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
    <main>
      <div className="fixed top-0 left-0 w-full">
        <ReturnButton />
        <ProfileHead />
      </div>
      <ul className="mt-56">
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
          <div ref={bottomSheetRef} onClick={(e) => e.stopPropagation()}>
            <ReactionBottomSheet
              isOpen={isBottomSheetOpen}
              onCloseAnimationEnd={handleCloseAnimationEnd}
            />
          </div>
        </div>
      )}
    </main>
  );
}
