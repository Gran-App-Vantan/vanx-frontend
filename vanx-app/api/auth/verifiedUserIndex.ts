import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { User } from "./types";

export type VerifiedUserResponse = 
  | {
    success: true;
    message: "取得に成功しました";
    data: {
      user: User;
    }
  }
  | {
    success: false;
    message: "取得に失敗しました";
    errors: string[];
  };

export async function VerifiedUserIndex() {
  const apiUrl = `${process.env.NEXT_PUBLIC_SNS_API_URL}/api/account/me`;
  const authToken = Cookies.get("authToken");

  console.log("🔐 VerifiedUserIndex 呼び出し", {
    apiUrl,
    hasAuthToken: !!authToken,
    authTokenPreview: authToken ? `${authToken.substring(0, 10)}...` : "なし"
  });

  return axios
    .get<VerifiedUserResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      console.log("✅ VerifiedUserIndex レスポンス", {
        success: res.data.success,
        userId: (res.data as any).data?.user?.id,
        userName: (res.data as any).data?.user?.name
      });
      return res.data;
    })
    .catch((err) => {
      console.error("❌ VerifiedUserIndex エラー:", err);

      return {
        success: false,
        message: "取得に失敗しました",
        errors: [err]
      };
    });
}