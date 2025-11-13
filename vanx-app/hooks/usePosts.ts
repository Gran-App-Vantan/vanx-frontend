import { useState, useEffect } from "react";
import { Post, PostIndex, PostIndexResponse } from "@/api/post/";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async ({ page }: { page: number }): Promise<PostIndexResponse | null> => {
    try {
      const response: PostIndexResponse = await PostIndex({ page });

      if (response.success) {
        const postsData = response.posts.data;
        const postsArray = Array.isArray(postsData) ? postsData : [];

        // 常にresponseを返すだけで、setPostsは呼び出し元で制御
        return response;
      } else {
        console.log("API Response failed:", response);
        return response;
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return null;
    }
  };

  const refreshPostsData = async () => {
    const response = await fetchPosts({ page: 1 });
    if (response && response.success) {
      const postsData = response.posts.data;
      const postsArray = Array.isArray(postsData) ? postsData : [];
      setPosts(postsArray);
    }
    return response;
  };

  // 初回読み込みは呼び出し元で制御するため、useEffectを削除

  return {
    posts,
    setPosts,
    fetchPosts,
    refreshPostsData,
  };
};