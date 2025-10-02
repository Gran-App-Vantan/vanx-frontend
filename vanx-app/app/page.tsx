// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PostList } from "@/components/features/post";
import { Header, FooterNavItem } from "@/components/shared/";
import { PostDelete } from "@/api/post/";
import { useUser } from "@/contexts/UserContext";
import { usePosts } from "@/hooks/usePosts";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const { posts, setPosts, loading, error } = usePosts();

  const handlePostDelete = async (postId: number) => {
    try {
      const response = await PostDelete({ postId });
      
      if (response.success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        alert("投稿を削除しました");
        router.refresh();
      } else {
        console.error("削除に失敗しました:", response.message);
        alert("削除に失敗しました");
      }
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除処理中にエラーが発生しました");
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <>
      <Header />
      <main>
        <div className="mt-24 mb-20">
          {/* UI制御はPostListに任せる */}
          <PostList posts={posts} onPostDelete={handlePostDelete} />
        </div>
      </main>
      <FooterNavItem userId={user?.id} />
    </>
  );
}
