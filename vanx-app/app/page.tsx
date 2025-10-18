"use client";

import { PostList } from "@/components/features/post";
import { Header, FooterNavItem } from "@/components/shared/";
import { useUser } from "@/contexts/UserContext";
import { usePosts } from "@/hooks/usePosts";
import { usePostDelete } from "@/hooks/usePostDelete";
import { useReactions } from "@/hooks/useReactionIndex";

export default function Home() {
  const { user } = useUser();
  const { posts, setPosts, refreshPostsData } = usePosts();
  const { handlePostDelete } = usePostDelete();
  const { reactions } = useReactions();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  const onReactionToggled = async () => {
    // リアクションが変更された時に投稿データを再取得
    await refreshPostsData();
  };

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
        </div>
      </main>
      <FooterNavItem userId={user?.id} />
    </>
  );
}
