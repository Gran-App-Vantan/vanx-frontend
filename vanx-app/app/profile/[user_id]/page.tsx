"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ReturnButton } from "@/components/shared";
import { ProfileHead } from "@/components/features/profile/";
import { PostList } from "@/components/features/post";
import { useUser } from "@/contexts/UserContext";
import { usePostDelete } from "@/hooks/usePostDelete";
import { ProfilePostIndex } from "@/api/profile/profilePostIndex";
import { Post } from "@/api/post";
import { User } from "@/api/auth";
import { useReactions } from "@/hooks/useReactionIndex";

export default function Profile() {
  const { user } = useUser();
  const { user_id: userId } = useParams();
  const { reactions } = useReactions();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { handlePostDelete } = usePostDelete();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  const fetchPosts = async () => {
    if (userId) {
      try {
        const response = await ProfilePostIndex({ userId: Number(userId) });
        
        if (response.success && "data" in response) {
          const data = response.data as { posts: Post[]; user: User };
          const responseUser = data.user;
          const postsData = data.posts;
          const postsArray = Array.isArray(postsData) ? postsData : [];

          setPosts(postsArray);
          setUserData(responseUser);
        }
      } catch (error) {
        console.error("ERROR", error);
      }
    }
  };

  const fetchMorePosts = async () => {
    if (loading || !nextPageUrl) return;

    setLoading(true);

    try {
      const response = await ProfilePostIndex({
        userId: Number(userId),
        page: nextPageUrl,
      })

      if (response.success) {
        setPosts((prevPosts) => {
          const data = response.data as { posts: Post[]; user: User };
          const newPosts = data.posts;
          const postsArray = Array.isArray(newPosts) ? newPosts : [];

          return [...prevPosts, ...postsArray];
        });
      }
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  const onReactionToggled = async () => {
    // リアクションが変更された時に投稿データを再取得
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  useEffect(() => {
    if (!observerRef.current || !nextPageUrl || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchMorePosts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef, nextPageUrl, loading]);

  return (
    <main>
      <div className="fixed top-0 left-0 w-full z-50">
        <ReturnButton />
        {user && <ProfileHead user={user} />}
      </div>

      <div className="mt-56">
        <PostList 
          posts={posts} 
          user={userData}
          reactionData={reactions}
          onPostDelete={onPostDelete}
          onReactionToggled={onReactionToggled}
        />
      </div>
    </main>
  );
}
