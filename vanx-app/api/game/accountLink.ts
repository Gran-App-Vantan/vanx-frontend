import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";

export interface AccountLinkRequest {
  userId: number | undefined;
  snsId: number;
  point: number | undefined;
}

export async function AccountLink({
  userId,
  snsId,
  point
}: AccountLinkRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_INDIAN_POKER_API_URL}/auth/enter`;
  const authToken = Cookies.get("authToken");

  // このマッピング頭悪すぎてしぬ
  const requestData = {
    user_id: userId,
    sns_id: snsId,
    point: point,
  }

  console.log(requestData);

  return axios
    .post(apiUrl, requestData,
      {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .catch((err) => {
      throw err;
    });
};