import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { User } from "../auth";

export type ProfileUpdateResponse =
  | {
      success: true;
      message: string;
      data: {
        user: User;
      };
    }
  | {
      success: false;
      message: string;
      errors: {
        err: string;
      }[];
    };

export async function profileUpdate(formData: FormData) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/update`;
  const authToken = Cookies.get("authToken");

  return axios
    .post<ProfileUpdateResponse>(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch((error) => {
      return {
        success: false,
        message: "プロフィールの更新に失敗しました。",
        errors: [{ err: error.message }],
      }
    });
}
