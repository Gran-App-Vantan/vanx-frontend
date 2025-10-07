import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { Post } from "../post";
import { User } from "../auth";

export type ProfilePostIndexResponse = 
  | {
      success: true;
      message: "取得に成功しました";
      data: {
        posts: Post[];
        user: User;
      };
    }
  | {
      success: false;
      message: "取得に失敗しました";
      errors: { err: string }[];
    };

export async function ProfilePostIndex({ userId }: { userId: number | undefined }) {
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
      res.data = humps.camelizeKeys(res.data) as ProfilePostIndexResponse;
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