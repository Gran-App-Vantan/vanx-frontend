"use client";

import { useState, useEffect, useRef } from "react";
import { PostList } from "@/components/features/post";
import { Header, FooterNavItem } from "@/components/shared/";
import { useUser } from "@/contexts/UserContext";
import { usePosts } from "@/hooks/usePosts";
import { usePostDelete } from "@/hooks/usePostDelete";
import { useReactions } from "@/hooks/useReactionIndex";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { posts, fetchPosts, setPosts, refreshPostsData } = usePosts();
  const { handlePostDelete } = usePostDelete();
  const { reactions } = useReactions();

  useEffect(() => {
    const initializePosts = async () => {
      const response = await fetchPosts({ page: 1 });
      if (response && response.success) {
        const postsData = response.posts.data;
        const postsArray = Array.isArray(postsData) ? postsData : [];

        setPosts(postsArray);
        setNextPageUrl(response.posts.nextPageUrl ? String(response.posts.nextPageUrl) : null);
      }
    };
    initializePosts();
  }, []);

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  const onReactionToggled = async () => {
    const response = await refreshPostsData();
    if (response && response.success) {
      setNextPageUrl(response.posts.nextPageUrl ? String(response.posts.nextPageUrl) : null);
    }
  };

  const fetchMorePosts = async () => {
    if (loading || !nextPageUrl) return;
    
    const pageMatch = nextPageUrl.match(/[?&]page=(\d+)/);
    const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : null;
    
    if (!pageNumber) return;
    
    setLoading(true);

    try {
      const response = await fetchPosts({ page: pageNumber });

      if (response && response.success) {
        const newPosts = response.posts.data;

        setPosts((prevPosts) => {
          const existingIds = new Set(prevPosts.map(post => post.id));
          const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post.id));
          return [...prevPosts, ...uniqueNewPosts];
        });
        
        setNextPageUrl(response.posts.nextPageUrl ? String(response.posts.nextPageUrl) : null);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

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
  }, [nextPageUrl, loading]);

  return (
    <>
      <Header />
      <main>
        <div className="mt-24 mb-20">
          <PostList 
            posts={posts}
            user={user}
            onPostDelete={onPostDelete}
            reactionData={reactions}
            onReactionToggled={onReactionToggled}
          />
          {nextPageUrl && (
            <div ref={observerRef} className="h-4 w-full">
              {loading && (
                <div className="flex justify-center items-center py-4">
                  <div className="text-gray-500">読み込み中...</div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <FooterNavItem userId={user?.id} />
    </>
  );
}
