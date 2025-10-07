import axios from "axios";
import Cookies from "js-cookie";
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
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/me`;
  const authToken = Cookies.get("authToken");

  return axios
    .get<VerifiedUserResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error:", err);

      return {
        success: false,
        message: "取得に失敗しました",
        errors: [err]
      };
    });
}