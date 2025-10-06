import { useState, useEffect } from "react";
import { Post, PostIndex, PostIndexResponse } from "@/api/post/";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response: PostIndexResponse = await PostIndex();

      if (response.success) {
        const postsData = response.data.posts.data;
        const postsArray = Array.isArray(postsData) ? postsData : [];

        console.log(postsData);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    setPosts,
    fetchPosts,
  };
};