import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../auth";
import { Wallet } from "../wallet/types";

export type ProfileIndexResponse =
  | {
    success: true;
    message: "プロフィール取得に成功しました";
    data: {
      user: User;
    }
    wallet: Wallet | null;
  }
  | {
    success: false;
    message: "プロフィール取得に失敗しました";
    errors: { err: string }[];
  }

export async function ProfileIndex({ userId }: { userId: string | number; }) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/profile/${userId}`;
  const authToken = Cookies.get("authToken");
  
  console.log("=== ProfileIndex Debug ===");
  console.log("環境変数 NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log("完全なAPI URL:", apiUrl);
  console.log("User ID:", userId);
  console.log("Auth Token:", authToken?.substring(0, 20) + "...");

  return axios
    .get<ProfileIndexResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then(res => {
      console.log("ProfileIndex成功:", res.data);
      return res.data;
    })
    .catch(err => {
      console.error("=== ProfileIndex Error Details ===");
      console.error("Status:", err.response?.status);
      console.error("Status Text:", err.response?.statusText);
      console.error("Response Data:", err.response?.data);
      console.error("Request URL:", err.config?.url);
      console.error("Request Headers:", err.config?.headers);
      throw err;
    });
}