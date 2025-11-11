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

  const requestBody = {
    user_id: userId,
    sns_id: snsId,
    point: point,
  }

  return axios
    .post(apiUrl, requestBody)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};