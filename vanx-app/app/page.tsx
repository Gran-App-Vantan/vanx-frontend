"use client";

import {
  PostItem,
  ReactionBottomSheet,
  PostDeleteModal,
} from "@/components/features/post";
import { Modal } from "@/components/shared";
import { PostIndex } from "@/api/post/postIndex";
import { Post } from "@/api/post/types";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const mapApiPostToPost = (apiPost: any): Post => ({
    id: apiPost.id,
    userId: apiPost.user_id,
    userName: apiPost.user?.name || "不明なユーザー",
    imageSrc: apiPost.postfile?.[0] || "/icons/default-user-icon.svg", // デフォルト画像を設定
    contents: apiPost.post_content || "",
    postReactions: apiPost.post_reactions || []
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostIndex();

        if (response.success && "data" in response) {
          const apiData = response.data as any;
          const mappedPosts: Post[] = apiData.posts.map(mapApiPostToPost);
          setPosts(mappedPosts);
        } else {
          console.log("Error:", response.message);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPosts();
  }, []);

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
        <div className="mt-24 mb-20">
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
              <div ref={bottomSheetRef} onClick={(e) => e.stopPropagation()}>
                <ReactionBottomSheet
                  isOpen={isBottomSheetOpen}
                  onCloseAnimationEnd={handleCloseAnimationEnd}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
