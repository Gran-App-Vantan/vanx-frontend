import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { Post } from "../post/types";

export type ToggleReactionRequest = {
  reactionId: number;
  postId: number;
}

export type ToggleReactionResponse = 
  | {
    success:true;
    message: "リアクションを追加しました";
    action: "created";
    data: {
      isReacted: true;
      reactionCount: number;
    };
  }
  | {
    success: true;
    message: "リアクションを削除しました";
    action: "deleted";
    data: {
      post: Post;
    }
  }
  | {
    success: false;
    message: "リアクション追加に失敗しました" | "リアクション削除に失敗しました";
    errors: {
      err: string
    };
  }

export async function toggleReaction({ reactionId, postId }: ToggleReactionRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/reaction/${postId}`;
  const authToken = Cookies.get("authToken");
  const requestBody = humps.decamelizeKeys({ reactionId });

  return axios
    .post<ToggleReactionResponse>(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch((err) => {
      console.error("toggleReaction error:", err);

      return {
        success: false,
        message: err.response?.data?.message || "リアクション追加に失敗しました",
        errors: { err: err.response?.data || err.message }
      }
    });
}