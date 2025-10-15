"use client";

import { PostList } from "@/components/features/post";
import { Header, FooterNavItem } from "@/components/shared/";
import { useUser } from "@/contexts/UserContext";
import { usePosts } from "@/hooks/usePosts";
import { usePostDelete } from "@/hooks/usePostDelete";
import { useReactions } from "@/hooks/useReactionIndex";

export default function Home() {
  const { user } = useUser();
  const { posts, setPosts } = usePosts();
  const { handlePostDelete } = usePostDelete();
  const { reactions } = useReactions();

  const onPostDelete = async (postId: number) => {
    await handlePostDelete(postId, setPosts);
  };

  return (
    <>
      <Header />
      <main>
        <div className="mt-24 mb-20">
          <PostList 
            posts={posts} 
            onPostDelete={onPostDelete}
            reactions={reactions} 
          />
        </div>
      </main>
      <FooterNavItem userId={user?.id} />
    </>
  );
}
