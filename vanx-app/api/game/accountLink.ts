import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";

export interface AccountLinkRequest {
  userId: number;
  snsId: number;
  point: number;
}

export async function AccountLink({
  userId,
  snsId,
  point
}: AccountLinkRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_INDIAN_POKER_API_URL}/auth/enter`;
  const authToken = Cookies.get("authToken");

  return axios
    .post(apiUrl, 
      {
        userId,
        snsId,
        point
      },
      {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};