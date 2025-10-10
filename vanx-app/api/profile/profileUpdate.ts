import axios from "axios";
import Cookies from "js-cookie";
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

  try {
    const res = await axios.post<ProfileUpdateResponse>(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("ERROR : ", error);

    return {
      success: false,
      message: "プロフィール更新に失敗しました。",
      errors: [{ err: error.message }],
    };
  }
}
