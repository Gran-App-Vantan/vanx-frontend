import { useState, useEffect } from "react";
import { Post, PostIndex, PostIndexResponse } from "@/api/post/";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async ({ page }: { page: number }) => {
    try {
      const response: PostIndexResponse = await PostIndex({ page });

      if (response.success) {
        const postsData = response.posts.data;
        const postsArray = Array.isArray(postsData) ? postsData : [];

        setPosts(postsArray);
      } else {
        console.log("API Response failed:", response);
        setPosts([]);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      setPosts([]);
    }
  };

  const refreshPostsData = async () => {
    await fetchPosts({ page: 1 });
  };

  useEffect(() => {
    fetchPosts({ page: 1 });
  }, []);

  return {
    posts,
    setPosts,
    fetchPosts,
    refreshPostsData,
  };
};