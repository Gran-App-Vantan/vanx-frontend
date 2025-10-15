"use client";

import { useState, useEffect, useRef } from "react";
import { PostItem } from "./PostItem";
import { PostDeleteModal } from "./PostDeleteModal";
import { ReactionBottomSheet } from "./ReactionBottomSheet";
import { Modal } from "@/components/shared";
import { Post } from "@/api/post/types";
import { User } from "@/api/auth/types";
import { Reaction } from "@/api/post/types";

type PostListProps = {
  posts: Post[];
  user?: User | null;
  reactions: Reaction[];
  onPostDelete: (postId: number) => Promise<void>;
};

export function PostList({ posts, user, onPostDelete }: PostListProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
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

  const handleDelete = async () => {
    if (currentPostId) {
      await onPostDelete(currentPostId);
      setIsDeleteModalOpen(false);
      setCurrentPostId(null);
    }
  };

  return (
    <>
      <ul>
        {posts.map((post) => {
          const normalizedPost = {
            ...post,
            contents: post.postContent ?? "",
          };
          
          return (
            <li key={post.id}>
              <PostItem
                post={normalizedPost}
                user={user}
                onDelete={() => {
                  setCurrentPostId(post.id);
                  setIsDeleteModalOpen(true);
                }}
                onClick={() => {
                  setCurrentPostId(post.id);
                  setIsBottomSheetOpen(true);
                }}
              />
            </li>
          );
        })}
      </ul>

      {isDeleteModalOpen && (
        <Modal
          size="normal"
          openModal={isDeleteModalOpen}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCurrentPostId(null);
          }}
        >
          <PostDeleteModal
            onDelete={handleDelete}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setCurrentPostId(null);
            }}
          />
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
    </>
  );
}