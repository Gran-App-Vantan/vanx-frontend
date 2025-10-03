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
      console.error("ERROR: ", err);

      return {
        success: false,
        message: "プロフィール取得に失敗しました",
        errors: [{ err: err.message || "プロフィールの取得に失敗しました" }]
      }
    });
}