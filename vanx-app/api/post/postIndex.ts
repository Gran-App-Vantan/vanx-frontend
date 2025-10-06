import axios from "axios";
import { Post } from "./types";

export type PostIndexResponse = 
  | {
    success: true;
    message: string;
    data: {
      posts: Post[];
    }
  }
  | {
    success: false;
    message: string;
  }

export async function PostIndex(): Promise<PostIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/posts`;

  try {
    const res = await axios.get<PostIndexResponse>(apiUrl);
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "投稿一覧の取得に失敗しました",
    };
  }
}