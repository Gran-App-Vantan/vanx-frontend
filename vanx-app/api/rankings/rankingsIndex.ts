import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";
import { RankingItem } from "./types";

export type RankingsIndexResponse = 
  | {
    success: true;
    message: string;
    data: {
      myAccount: RankingItem;
      users: [
        RankingItem
      ]
    }
  }
  | {
    success: false;
    message: string;
    errors: {
      err: string;
    }
  }

export async function RankingsIndex({ page }: { page?: number }): Promise<RankingsIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/wallet/get/?page=${page}`;
  const authToken = Cookies.get("authToken");

  return axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      } 
    })
    .then((res) => {
      res.data = humps.camelizeKeys(res.data) as typeof res.data;
      return res.data;
    })
    .catch((error) => {
      console.error("ERROR: ", error);

      return {
        success: false,
        message: "通信に失敗しました。",
        errors: {
          err: error.message
        }
      };
    });
};