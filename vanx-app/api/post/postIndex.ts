import axios from "axios";
import { User } from "../auth/types";
import { Reaction, PostFiles } from "./types";

export type PostIndexResponse = 
  | {
    success: true;
    message: string;
    data: {
      posts: [
        {
          id: number;
          userId: number;
          postContent: string;
          createdAt: string;
          updatedAt: string;
          user: User;
          postFiles: PostFiles[];
          postReactions: Reaction[];
        }
      ]
    }
  }
  | {
    success: false;
    message: string;
  }

export async function PostIndex() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/posts`;

  return axios
    .get<PostIndexResponse>(apiUrl)
    .then((res) => res.data)
    .catch((err) => {
      return {
        success: false as const,
        message: err.response?.data?.message || "投稿一覧の取得に失敗しました",
      }
    });
};