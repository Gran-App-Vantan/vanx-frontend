import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";

export type TokenCheckResponse = 
  | {
    success: true;
    message: string;
    data: {
      userId: number;
      hasPoint: number;
      token: string;
      deviceId: number;
      expiresAt: string;
    }
  }
  | {
    success: false;
    message: string;
  }

export async function TokenCheck(token: string): Promise<TokenCheckResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/game/token-check`;
  const authToken = Cookies.get("authToken");

  return axios
    .post(apiUrl, {
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