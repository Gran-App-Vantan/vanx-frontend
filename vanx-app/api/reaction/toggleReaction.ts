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

  return axios
    .post<ToggleReactionResponse>(apiUrl, { reactionId }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch((err) => {
      console.warn(err);

      return {
        success: false,
        message: "リアクション追加に失敗しました",
        errors: { err: err.message }
      }
    });
}