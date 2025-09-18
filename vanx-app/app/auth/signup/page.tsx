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

  return (
    <main>
      <div>
        <Logo />
        <h1>アカウント新規作成</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="userName">
              ユーザー名
              <span>必須</span>
            </label>
          </div>
          <Input
            id="userName"
            size="normal"
            type="text"
            placeholder="ユーザー名"
            onChange={(value) => setValue("userName", value)}
            error={passwordError}
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">
              パスワード
              <span>必須</span>
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
        <div>
          <div>
            <label htmlFor="confirmPassword">
              パスワードの確認
              <span>必須</span>
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
        <div>
          <input type="checkbox" />
          <label htmlFor="">文化祭を楽しみ尽くす</label>
        </div>
        <Button buttonType="grayButton" text="確認" size="l" />
      </form>
    </main>
  );
}
