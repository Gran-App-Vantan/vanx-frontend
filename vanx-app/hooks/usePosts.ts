import { useState, useEffect } from "react";
import { Post, PostIndex, PostIndexResponse } from "@/api/post/";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response: PostIndexResponse = await PostIndex();

      if (response.success) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    setPosts,
    fetchPosts,
  };
};