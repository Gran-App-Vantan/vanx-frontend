"use client";

import { useState } from "react";
import { SignUpParams } from "@/api/auth/types";
import { Logo, Input, Button } from "@/components/shared";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState<SignUpParams>({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  //
  // TODO : エラーメッセージはバックエンド側から取得
  //

  const [passwordError, setPasswordError] = useState<
    | "必須項目です"
    | "ユーザーIDとパスワードが一致しません"
    | "パスワードが一致しません"
    | "既に存在しているユーザーIDです"
    | undefined
  >(undefined);

  const setValue = (field: keyof SignUpParams, value: string) => {
    setFormValues({ ...formValues, [field]: value });

    if (
      field === "userName" ||
      field === "password" ||
      field === "confirmPassword"
    ) {
      setPasswordError(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  const isAllFilled =
    formValues.userName.length > 0 &&
    formValues.password.length > 0 &&
    formValues.confirmPassword.length > 0;

  return (
    <main className="flex flex-col items-center justify-center gap-9 min-h-screen">
      <div className="flex flex-col items-center gap-9">
        <Logo />
        <h1 className="text-h1 text-text">
          アカウント新規作成
        </h1>
      </div>
      <form 
        className="flex flex-col gap-10 border-y border-y-text-gray py-16"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3"
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
            error={formValues.userName.length === 0 && passwordError === "必須項目です" ? passwordError : undefined}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3"
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
            error={passwordError}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label 
              className="flex items-center gap-3 text-label text-text px-3"
              htmlFor="confirmPassword"
            >
              パスワードの確認
              <span className="bg-red-letters text-white py-1 px-2 rounded-sm">
                必須
              </span>
            </label>
          </div>
          <Input
            id="confirmPassword"
            size="normal"
            type="password"
            placeholder="パスワードを再入力"
            value={formValues.confirmPassword}
            onChange={(value) => setValue("confirmPassword", value)}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            isPasswordVisible={confirmPasswordVisible}
            error={passwordError}
          />
        </div>
        <div className="flex gap-2.5">
          <input 
            className="
              appearance-none outline-none w-5 h-5 rounded-sm border border-text-gray bg-white
              checked:bg-accent checked:border-accent checked:bg-[url('/icons/check-icon.svg')] checked:bg-no-repeat checked:bg-center
            "
            type="checkbox"
          />
          <label 
            htmlFor=""
          >
            文化祭を楽しみ尽くす
          </label>
        </div>
        <Button 
          buttonType={isAllFilled ? "redButton" : "grayButton"} 
          text="確認" 
          size="l" 
        />
      </form>
    </main>
  );
}
