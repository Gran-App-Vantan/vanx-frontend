import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../auth";

export type ProfileUpdateRequest = {
  name: string;
  userPath: string;
  userIcon: string;
}

export type ProfileUpdateResponse = 
  | {
    success: true;
    message: string;
    data: {
      user: User;
    }
  }
  | {
    success: false;
    message: string;
    errors: { 
      err: string 
    }[];
  }

export async function profileUpdate() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/update`;
  const authToken = Cookies.get("authToken");

  return axios
    .put<ProfileUpdateResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("ERROR : ", error);
      
      return {
        success: false,
        message: "プロフィール更新に失敗しました。",
        errors: [{ err: error.message }]
      }
    })
}