import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { ReactionData } from "./types";

export type ReactionIndexRequest = {
  category:
  | "symbol"
  | "object"
  | "all"
  | "face"
  | "nature"
  | "food"
  | "activity"
  | "travel"
  | "original"
  | "emoji";
  page: number,
}

export type ReactionIndexResponse = 
  | {
    success: true,
    messages: string,
    reactions: ReactionData
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
  .get<ReactionIndexResponse>(apiUrl, {
    params: {
      category,
      page: page.toString(),
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
      'Content-Type': 'application/json'
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