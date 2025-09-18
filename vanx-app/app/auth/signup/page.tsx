"use client";

import { useState } from "react";
import { Logo, Input, Button } from "@/components/shared";

export default function SignUp() {
  const [value, setValue] = useState("");

  return (
    <main>
      <div>
        <Logo />
        <h1>アカウント新規作成</h1>
        <form>
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
              onChange={(val) => setValue(val)}
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
            />
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">文化祭を楽しみ尽くす</label>
          </div>
          <Button
            buttonType="grayButton"
            text="確認"
            size="l"
          />
        </form>
      </div>
    </main>
  );
}
