"use client";

import { PostList } from "@/components/features/post";
import { Header, FooterNavItem } from "@/components/shared/";
import { useUser } from "@/contexts/UserContext";
import { usePosts } from "@/hooks/usePosts";
import { usePostDelete } from "@/hooks/usePostDelete";

export default function Home() {
  const { user } = useUser();
  const { posts, setPosts, loading, error } = usePosts();
  const { handlePostDelete } = usePostDelete();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <>
      <Header />
      <main>
        <div className="mt-24 mb-20">
          <PostList posts={posts} onPostDelete={onPostDelete} />
        </div>
      </main>
      <FooterNavItem userId={user?.id} />
    </>
  );
}
