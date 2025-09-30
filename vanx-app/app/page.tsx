"use client";

import {
  PostItem,
  ReactionBottomSheet,
  PostDeleteModal,
} from "@/components/features/post";
import { Modal } from "@/components/shared";
import { Post, PostIndex, PostDelete } from "@/api/post/";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);  
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const handlePostDelete = async (postId: number) => {
    try {
      const response = await PostDelete({postId});
      
      if (response.success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        alert("投稿を削除しました");
        setIsDeleteModalOpen(false);
        router.refresh();
      } else {
        console.error("削除に失敗しました:", response.message);
        alert("削除に失敗しました");
      }
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除処理中にエラーが発生しました");
    }
  }

  const mapApiPostToPost = (apiPost: any): Post => {
    const userIcon = apiPost.user?.user_icon && apiPost.user.user_icon !== "default_icon.png"
      ? `/uploads/user_icons/${apiPost.user.user_icon}`
      : "/icons/default-user-icon.svg";
    
    const fileData = apiPost.postFiles || apiPost.postfile || apiPost.files || apiPost.post_files || apiPost.attachments || [];
    
    const files = fileData.map((file: any) => {
      // バックエンドから post_file_url が返される場合はそのまま使用
      // 返されない場合は post_file_path からフォールバック生成
      const fileUrl = file.post_file_url || 
        `${process.env.NEXT_PUBLIC_API_URL}/api/storage/${file.post_file_path || file.postFilePath || file.path}`;
      
      const filePath = file.post_file_path || file.postFilePath || file.path;
      
      return {
        id: file.id.toString(),
        url: fileUrl,
        type: file.post_file_type || file.postFileType || file.type || "image",
        name: filePath?.split('/').pop() || `file_${file.id}`
      };
    });

    const mappedPost = {
      id: apiPost.id,
      userId: apiPost.user_id,
      userName: apiPost.user?.name || "不明なユーザー",
      imageSrc: userIcon,
      contents: apiPost.post_content || "",
      files: files,
      postReactions: apiPost.post_reactions || []
    };
    return mappedPost;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostIndex();

        if (response.success && "data" in response) {
          const apiData = response.data as any;
          let postsArray: any[] = [];
          
          if (Array.isArray(apiData.posts)) {
            postsArray = apiData.posts;
          } else if (apiData.posts && apiData.posts.data && Array.isArray(apiData.posts.data)) {
            postsArray = apiData.posts.data;
          } else {
            setPosts([]);
            return;
          }
          
          if (postsArray.length === 0) {
            //
            // TODO: 投稿が0件の場合の表示（どうしよう🤔）
            //
            setPosts([]);
            return;
          }
          
          const mappedPosts: Post[] = postsArray.map((post: any) => {
            return mapApiPostToPost(post);
          });
          setPosts(mappedPosts);
        } else {
          console.error("APIエラー:", response.message);
        }
      } catch (error) {
        console.error("例外エラー:", error);
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
                  onDelete={() => {
                    setIsDeleteModalOpen(true);
                    setPostId(post.id);
                  }}
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
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <PostDeleteModal 
              onDelete={() => handlePostDelete(postId!)}
              onClose={() => setIsDeleteModalOpen(false)} 
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
      </div>
    </main>
  );
}
