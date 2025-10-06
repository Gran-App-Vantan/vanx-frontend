"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ReturnButton } from "@/components/shared";
import { ProfileHead } from "@/components/features/profile/";
import { PostList } from "@/components/features/post";
import { useUser } from "@/contexts/UserContext";
import { usePostDelete } from "@/hooks/usePostDelete";
import { ProfilePostIndex } from "@/api/profile/profilePostIndex";
import { Post } from "@/api/post";

export default function Profile() {
  const { user } = useUser();
  const { user_id: userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const { handlePostDelete } = usePostDelete();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        try {
          const response = await ProfilePostIndex({ userId: Number(userId) });

          if (response.success && "data" in response) {
            const data = response.data as { posts: Post[] };
            setPosts(data.posts);
          }
        } catch (error) {
          console.error("ERROR", error);
        }
      }
    };

    fetchPosts();
  }, [userId]);

  console.log(posts);

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
