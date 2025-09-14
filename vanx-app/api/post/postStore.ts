import axios from "axios";
import Cookies from "js-cookie";

import { User } from "../auth/types";
import { Reaction, PreviewFile } from "./types";

export type postStoreRequest = {
  content: string;
  files?: string[];
}

export type postStoreResponse = {
  success: boolean;
  message: string;
  data?: {
    post: {
      id: number;
      userId: number;
      postContent: string;
      createdAt: string;
      updatedAt: string;
      user: User;
      files?: PreviewFile[]; // 空配列で返す
      reactions?: Reaction[]; // 空配列で返す
    }
  } 
}

export async function postStore(req: postStoreRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/post`;
  const authToken = Cookies.get("authToken");

  return axios
    .post<postStoreRequest>(apiUrl, req, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      }
    })
    .then((res) => res.data)
    .catch((err) => {
      console.warn(err);

      return {
        success: false,
        message: "投稿に失敗しました",
        errors: {err,}
      }
    });
}