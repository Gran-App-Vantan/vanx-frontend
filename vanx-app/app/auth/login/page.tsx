"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginParams } from "@/api/auth/types";
import { Logo, Input, Button } from "@/components/shared";
import { Login as loginApi } from "@/api/auth/login";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState<LoginParams>({
    userName: "",
    password: "",
  });

  const [Error, setError] = useState<
    | "必須項目です"
    | "ユーザー名とパスワードが一致しません"
    | undefined
  >(undefined);

  const setValue = (field: keyof LoginParams, value: string) => {
    const trimmedValue = value.trim();
    setFormValues({ ...formValues, [field]: trimmedValue });

    if (
      field === "userName" || field === "password"
    ) {
      setError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await loginApi({
      user: {
        name: formValues.userName,
        password: formValues.password,
      }
    });

    if (response.success && "authToken" in response) {
      Cookies.set("authToken", response.authToken as string);
      router.push("/");
    } else {
      console.log("Error:", response.messages);
    }
  };

  const isAllFilled =
  formValues.userName.length > 0 &&
  formValues.password.length > 0;

  return (
    <main className="flex flex-col items-center justify-start gap-9 min-h-screen py-20">  
      <div className="flex flex-col items-center gap-9">
        <Logo />
        <h1 className="text-h1 text-text">
          ログイン
        </h1>
      </div>
      <form
        className="flex flex-col gap-10 border-y border-y-text-gray py-16"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3.5"
              htmlFor="userName"
            >
              ユーザー名
              <span className="bg-red-letters text-white py-1 px-2 rounded-sm">
                必須
              </span>
            </label>
          </div>
          <Input
            id="userName"
            size="normal"
            type="text"
            placeholder="ユーザー名"
            onChange={(value) => setValue("userName", value)}
            error={Error}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3.5"
              htmlFor="password"
            >
              パスワード
              <span className="bg-red-letters text-white py-1 px-2 rounded-sm">
                必須
              </span>
            </label>
          </div>
          <Input
            id="password"
            size="normal"
            type="password"
            placeholder="パスワードを入力"
            value={formValues.password}
            onChange={(value) => setValue("password", value)}
            onClick={() => setPasswordVisible(!passwordVisible)}
            isPasswordVisible={passwordVisible}
            error={Error}
          />
        </div>
        <Button 
          className="mt-36"
          buttonType={isAllFilled ? "redButton" : "grayButton"}
          text="ログイン"
          size="l"
          disabled={!isAllFilled}
          type="submit"
        />
      </form>
    </main>
  );
}
