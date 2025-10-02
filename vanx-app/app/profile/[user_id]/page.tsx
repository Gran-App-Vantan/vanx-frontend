"use client";

import { ReturnButton } from "@/components/shared";
import { ProfileHead } from "@/components/features/profile/ProfileHead";
import { PostList } from "@/components/features/post";
import { usePosts } from "@/hooks/usePosts";
import { usePostDelete } from "@/hooks/usePostDelete";

export default function Profile() {
  const { posts, setPosts, loading, error } = usePosts();
  const { handlePostDelete } = usePostDelete();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  return (
    <main>
      <div className="fixed top-0 left-0 w-full">
        <ReturnButton />
        <ProfileHead />
      </div>

      <div className="mt-40">
        {loading ? (
          <div>読み込み中...</div>
        ) : error ? (
          <div>エラー: {error}</div>
        ) : (
          <PostList posts={posts} onPostDelete={onPostDelete} />
        )}
      </div>
    </main>
  );
}
