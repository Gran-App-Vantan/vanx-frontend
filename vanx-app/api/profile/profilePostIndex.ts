import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../auth";
import { Post } from "../post";

export type ProfilePostIndexResponse = 
  | {
    success: true;
    message: "取得に成功しました";
    data: {
      user: User;
      posts: Post[];
    }
  }
  | {
    success: false;
    message: "取得に失敗しました";
    errors: { err: string }[];
  }

export async function ProfilePostIndex({ userId }: { userId: string }) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/profile/${userId}`;
  const authToken = Cookies.get("authToken");

  return axios
    .get<ProfilePostIndexResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error("ERROR: ", err);

      return {
        success: false,
        message: "取得に失敗しました",
        errors: [{ err: err.message || "取得に失敗しました" }]
      };
    })
}