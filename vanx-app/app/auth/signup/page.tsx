"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { SignUpParams } from "@/api/auth/types";
import { Logo, Input, Button } from "@/components/shared";
import { Signup } from "@/api/auth/signup";

export default function SignUp() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formValues, setFormValues] = useState<SignUpParams>({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState<
    | "必須項目です"
    | "ユーザー名とパスワードが一致しません"
    | "パスワードが一致しません"
    | undefined
  >(undefined);

  const setValue = (field: keyof SignUpParams, value: string) => {
    const trimmedValue = value.trim();
    setFormValues({ ...formValues, [field]: trimmedValue });

    if (
      field === "userName" ||
      field === "password" ||
      field === "confirmPassword"
    ) {
      setPasswordError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isConfirmed) {
      const response = await Signup({
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
        setIsConfirmed(false);
      }
      return;
    }

    if (
      formValues.userName.length === 0 ||
      formValues.password.length === 0 ||
      formValues.confirmPassword.length === 0
    ) {
      setPasswordError("必須項目です");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setPasswordError("パスワードが一致しません");
      return;
    }

    setIsConfirmed(true);
  };

  const isAllFilled =
    formValues.userName.trim().length > 0 &&
    formValues.password.trim().length > 0 &&
    formValues.confirmPassword.trim().length > 0;

  return (
    <main className="flex flex-col items-center justify-center gap-9 min-h-screen py-20">
      {isConfirmed && (
        <button
          className="absolute top-0 left-0 mt-6 ml-6 text-label text-text"
          onClick={() => setIsConfirmed(false)}
        >
          ← 戻る
        </button>
      )}
      <div className="flex flex-col items-center gap-9">
        <Logo />
        <h1 className="text-h1 text-text">
          {isConfirmed ? "入力内容の確認" : "アカウント新規作成"}
        </h1>
      </div>
      <form 
        className="flex flex-col gap-10 border-y border-y-text-gray py-16"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3.5"
              htmlFor="userName"
            >
              ユーザー名
              {!isConfirmed && (
                <span className="bg-red-letters text-white text-small py-1 px-2 rounded-sm">
                  必須
                </span>
              )}
            </label>
          </div>
          <Input
            id="userName"
            size="normal"
            type="text"
            placeholder="ユーザー名"
            readonly={isConfirmed}
            value={formValues.userName}
            onChange={(value) => setValue("userName", value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3.5"
              htmlFor="password"
            >
              パスワード
              {!isConfirmed && (
                <span className="bg-red-letters text-white text-small py-1 px-2 rounded-sm">
                  必須
                </span>
              )}
            </label>
          </div>
          <Input
            id="password"
            size="normal"
            type="password"
            placeholder="パスワードを入力"
            readonly={isConfirmed}
            value={formValues.password}
            onChange={(value) => setValue("password", value)}
            onClick={() => setPasswordVisible(!passwordVisible)}
            isPasswordVisible={passwordVisible}
            error={passwordError}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3.5"
              htmlFor="confirmPassword"
            >
              パスワードの確認
              {!isConfirmed && (
                <span className="bg-red-letters text-white text-small py-1 px-2 rounded-sm">
                  必須
                </span>
              )}
            </label>
          </div>
          <Input
            id="confirmPassword"
            size="normal"
            type="password"
            placeholder="パスワードを再入力"
            readonly={isConfirmed}
            value={formValues.confirmPassword}
            onChange={(value) => setValue("confirmPassword", value)}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            isPasswordVisible={confirmPasswordVisible}
            error={passwordError}
          />
        </div>
        <div className="flex gap-2.5 pl-2">
          <input 
            id="check"
            className="
              appearance-none outline-none w-5 h-5 rounded-sm border border-text-gray bg-white
              checked:bg-accent checked:border-accent checked:bg-[url('/icons/check-icon.svg')] checked:bg-no-repeat checked:bg-center
            "
            type="checkbox"
          />
          <label 
            htmlFor="check"
            className="text-label text-text"
          >
            文化祭を楽しみ尽くす
          </label>
        </div>
        <Button 
          buttonType={isAllFilled ? "redButton" : "grayButton"} 
          text={isConfirmed ? "登録" : "確認"}
          size="l" 
          disabled={!isAllFilled}
          type="submit"
        />
      </form>
    </main>
  );
}
