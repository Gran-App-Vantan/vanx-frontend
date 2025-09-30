import axios from "axios";
import Cookies from "js-cookie";

import { User } from "../auth/types";
import { Reaction, PreviewFile } from "./types";

export type PostStoreResponse = {
  success: boolean;
  message: string;
  data?: {
    post: {
      id: number;
      userId: number;
      postContent: string;
      created_at: string;
      updated_at: string;
      user: User;
      files: PreviewFile[];
      reactions: Reaction[];
    }
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