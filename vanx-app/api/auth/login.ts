import axios from "axios";

export type LoginRequest = {
  user: {
    name: string;
    password: string;
  }
};

export type LoginResponse = 
  | {
    success: true;
    messages: string[];
    authToken: string;
  }
  | {
    success: false;
    messages: string[];
  };

export async function Login(req: LoginRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SNS_API_URL}/api/account/login`;

  return axios
    .post<LoginResponse>(apiUrl, req)
    .then((res) => res.data)
    .catch((err) => {
      return {
        success: false as const,
        messages: err.response?.data?.messages || ["ログインに失敗しました"],
      };
    });
}