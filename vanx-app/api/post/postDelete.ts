import axios from "axios";
import Cookies from "js-cookie";
import { Post } from "./types";

export type PostDeleteResponse = 
  | {
      success: true;
      message: "投稿を削除しました";
      data: {
        post: Post;
      };
  }
  | {
    success: false;
    message: "投稿削除に失敗しました";
    errors: string[];
  }

export async function PostDelete({ postId }: { postId: number }) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/delete/${postId}`;
  const authToken = Cookies.get("authToken");

  return axios
    .delete<PostDeleteResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
        
      }
    })
    .then((res) => res.data)
    .catch((err) => {
      return {
        success: false as const,
        message: "投稿削除に失敗しました",
        errors: [err.message]
      };
    });
};