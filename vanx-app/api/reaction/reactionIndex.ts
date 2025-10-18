import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { ReactionData } from "./types";

export type ReactionIndexRequest = {
  category: "all" | "emoji" | "nature" | "food" | "activity" | "travel" | "object" | "symbol" | "original",
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

  // デバッグ情報
  console.log('API Request Details:', {
    category,
    page,
    apiUrl,
    authToken: authToken ? 'present' : 'missing',
    fullUrl: `${apiUrl}?category=${category}&page=${page}`
  });

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
    console.error("Request config:", err.config);
    console.error("Response data:", err.response?.data);
    
    // サーバーからのエラーメッセージを詳細に出力
    if (err.response?.data) {
      console.error("Server error details:", JSON.stringify(err.response.data, null, 2));
      if (err.response.data.messages) {
        console.error("Server messages:", err.response.data.messages);
      }
    }

    return {
      success: false,
      messages: `${category}のリアクションの取得に失敗しました`,
      errors: [{ err: err.message || `${category}のリアクションの取得に失敗しました` }]
    }
  })
}