"use client";

import { useState, useEffect } from "react";
import { ReturnButton } from "@/components/shared";
import { ProfileHead } from "@/components/features/profile/";
import { PostList } from "@/components/features/post";
import { useUser } from "@/contexts/UserContext";
import { usePostDelete } from "@/hooks/usePostDelete";
import { ProfilePostIndex } from "@/api/profile/profilePostIndex";
import { Post } from "@/api/post";

export default function Profile() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const { handlePostDelete } = usePostDelete();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await ProfilePostIndex({ userId: user?.id });

        if (response.success && "data" in response) {
          const data = response.data as { posts: Post[] };
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("ERROR", error);
      }
    };

    fetchPosts();
  }, [user?.id]);

  return (
    <main>
      <div className="fixed top-0 left-0 w-full">
        <ReturnButton />
        {user && <ProfileHead user={user} />}
      </div>

      <div className="mt-56">
        <PostList posts={posts} onPostDelete={onPostDelete} />
      </div>
    </main>
  );
}
