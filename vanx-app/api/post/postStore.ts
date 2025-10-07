import axios from "axios";
import Cookies from "js-cookie";
import { Post } from "./types";

export type PostStoreResponse = {
  success: boolean;
  message: string;
  data?: {
    post: Post[];
  }
}

export async function postStore(formData: FormData) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/post`;
  const authToken = Cookies.get("authToken");

  return axios
    .post<PostStoreResponse>(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);

      return {
        success: false,
        message: "投稿に失敗しました",
        errors: {err,}
      }
    });
}