import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { Reaction } from "@/api/post/types";

export type ReactionIndexRequest = {
  category: "all" | "face" | "nature" | "food" | "activity" | "travel" | "object" | "symbol" | "original",
  page: Number,
}

export type ReactionIndexResponse = 
  | {
    success: true,
    messages: string,
    reactions: Reaction[]
  } 
  | {
    success: false,
    messages: string,
    errors: { err: string }[]
  }

export async function ReactionIndex({ 
  category, 
  page 
}: ReactionIndexRequest): Promise<ReactionIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/reaction/get`;
  const authToken = Cookies.get("authToken");

  return axios
  .get<ReactionIndexRequest>(apiUrl, {
    params: {
      category,
      page
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json"
    }
  })
  .then(res => {
    res.data = humps.camelizeKeys(res.data) as typeof res.data;
    return res.data;
  })
  .catch(err => {
    console.error("ERROR", err);

    return {
      success: false,
      messages: `${category}のリアクションの取得に失敗しました`,
      errors: [{ err: err.message || `${category}のリアクションの取得に失敗しました` }]
    }
  })
}