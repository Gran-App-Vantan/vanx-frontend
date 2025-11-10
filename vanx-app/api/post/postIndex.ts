import axios from "axios";
import humps from "humps";
import { PostData } from "./types";

export type PostIndexResponse = 
  | {
    success: true;
    message: string;
    posts: PostData;
  }
  | {
    success: false;
    message: string;
  }

export async function PostIndex({ page }: { page: number }): Promise<PostIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SNS_API_URL}/api/post/posts?page=${page}`;

  try {
    const res = await axios.get<PostIndexResponse>(apiUrl);
    res.data = humps.camelizeKeys(res.data) as PostIndexResponse;
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "投稿一覧の取得に失敗しました",
    };
  }
}