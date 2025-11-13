import { useRouter } from "next/navigation";
import { PostDelete } from "@/api/post/";
import { Post } from "@/api/post/types";

export const usePostDelete = () => {
  const router = useRouter();

  const handlePostDelete = async (
    postId: number,
    setPosts?: React.Dispatch<React.SetStateAction<Post[]>>
  ) => {
    try {
      const response = await PostDelete({ postId });
      
      if (response.success) {
        if (setPosts) {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        }
        alert("投稿を削除しました");
        router.refresh();
        return true;
      } else {
        console.error("削除に失敗しました:", response.message);
        alert("削除に失敗しました");
        return false;
      }
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除処理中にエラーが発生しました");
      return false;
    }
  };

  return { handlePostDelete };
};