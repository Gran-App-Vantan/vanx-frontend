"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo, Modal } from "@/components/shared";
import { LoadingIcon, LargeCheckIcon, FailureIcon } from "@/components/shared/icons";
import { TokenCheck } from "@/api/game";

type isConnecting = "connecting" | "connected" | "failed";

export default function Connection() {
  const params = useParams<{ token: string }>();
  const [connectionState, setConnectionState] =
    useState<isConnecting>("connecting");

  const tokenCheck = async () => {
    try {
      const response = await TokenCheck(params.token);

      if (response.success) {
        console.log("トークンの確認に成功しました");
        setConnectionState("connected");
      } else {
        console.error("トークンの確認に失敗しました");
        setConnectionState("failed");
      }
    } catch (error) {
      console.error("エラー: ", error);
      setConnectionState("failed");
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <main>
      <div className="flex justify-center items-start w-screen h-screen mt-20">
        <Logo />
      </div>
      <Modal
        size="large"
        openModal={true} // 常に表示
        onClose={() => {}} // 閉じる操作を無効化
      >
        {connectionState === "connecting" ? (
          <div className="flex flex-col items-center gap-4">
            <LoadingIcon className="animate-spin" />
            <p className="text-text text-normal">接続中...</p>
          </div>
        ) : connectionState === "connected" ? (
          <div className="flex flex-col items-center gap-4">
            <LargeCheckIcon />
            <div className="text-normal text-text text-center">
              <p>接続に成功しました！</p>
              <p>ゲームをお楽しみください！</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <FailureIcon />
            <p>接続に失敗しました</p>
            <button
              className="flex justify-center items-center w-50 h-11 bg-accent text-white rounded-full mt-7"
              onClick={() => {
                setConnectionState("connecting");
                tokenCheck();
              }}
            >
              もう一度接続
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}
