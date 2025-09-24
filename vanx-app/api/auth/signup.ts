import axios from "axios";

export type SignupRequest = {
  user: {
    name: string;
    password: string;
  }
};

export type SignupResponse = 
  | {
      success: true;
      messages: string[];
      authToken: string;
      user: {
        id: number;
        name: string;
        userPath: string;
        userJob: string;
      };
    }
  | {
      success: false;
      messages: string[];
    };

export async function signup(req: SignupRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/sign-up`;

  return axios
    .post<SignupResponse>(apiUrl, req)
    .then((res) => res.data)
    .catch((err) => {
      return {
        success: false as const,
        messages: err.response?.data?.messages || ["ユーザー登録に失敗しました"],
      };
    });
}