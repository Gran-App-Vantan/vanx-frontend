import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";

export type WalletIndexResponse = 
  | {
    success: true;
    message: string;
    data: {
      pointBalance: number;
    }
  }
  | {
    success: false;
    message: string;
    errors: {
      err: string;
    }
  }

export async function WalletIndex({ filter }: { filter: string }): Promise<WalletIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/wallet/get/?filter=${filter}`;
  const authToken = Cookies.get("authToken");

  return axios
    .get<WalletIndexResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then(res => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch(err => {
      console.error("ERROR", err);

      return {
        success: false,
        message: "ウォレット情報の取得に失敗しました。",
        errors: { err: err.message }
      };
    })
}