"use client";

import { useState, useEffect, useRef } from "react";
import { PostItem } from "./PostItem";
import { PostDeleteModal } from "./PostDeleteModal";
import { ReactionBottomSheet } from "../reaction/ReactionBottomSheet";
import { Modal } from "@/components/shared";
import { Post } from "@/api/post/types";
import { User } from "@/api/auth/types";
import { ReactionData, toggleReaction, Reaction } from "@/api/reaction";

type PostListProps = {
  posts: Post[];
  user?: User | null;
  reactionData: ReactionData | null;
  onPostDelete: (postId: number) => Promise<void>;
  onReactionToggled?: () => void;
};

export function PostList({ 
  posts, 
  user, 
  reactionData, 
  onPostDelete,
  onReactionToggled 
}: PostListProps) {
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

  const handleDeleteOpen = (post: Post) => {
    setCurrentPostId(post.id);
    setIsDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    if (currentPostId) {
      await onPostDelete(currentPostId);
      setIsDeleteModalOpen(false);
      setCurrentPostId(null);
    }
  };

  const handleBottomSheetOpen = (postId: number) => {
    setCurrentPostId(postId);
    setIsBottomSheetOpen(true);
  };

  const isOwnPost = (
    post: Post,
  ): boolean => {
    if (!user) return false;
    return post.userId === user.id;
  };

  const isOwnReaction = (
    postReactions: { userId: number }[],
  ): boolean => {
    if (!user) return false;
    return postReactions.some(r => r.userId === user.id);
  };

  const handleToggleReaction = async (
    reactionId: number, 
    postId: number
  ) => {
    try {
      const result = await toggleReaction({ reactionId, postId });
      if (result.success) {
        onReactionToggled?.();
      }
    } catch (error) {
      console.error("リアクションの切り替えに失敗しました:", error);
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
                isOwnPost={isOwnPost(post)}
                isOwnReaction={isOwnReaction(post.postReactions)}
                onDelete={() => handleDeleteOpen(post)}
                onOpen={() => handleBottomSheetOpen(post.id)}
                toggleReaction={(reactionId: number) => handleToggleReaction(reactionId, post.id)}
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

      {isBottomSheetVisible && currentPostId !== null && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-[#9A9A9A]/50 flex items-end z-50"
          onClick={() => setIsBottomSheetOpen(false)}
        >
          <div ref={bottomSheetRef} onClick={(e) => e.stopPropagation()}>
            <ReactionBottomSheet
              reactionData={reactionData}
              isOpen={isBottomSheetOpen}
              onCloseAnimationEnd={() => handleCloseAnimationEnd()}
              postId={currentPostId}
              onReactionToggled={onReactionToggled}
            />
          </div>
        </div>
      )}
    </>
  );
}
