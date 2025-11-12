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
      // エラーレスポンスをより詳細に処理
      if (err.response) {
        const error = new Error();
        error.message = err.response.data?.message || 'アカウント連携に失敗しました';
        (error as any).statusCode = err.response.status;
        (error as any).data = err.response.data;
        throw error;
      }
      throw err;
    });
};