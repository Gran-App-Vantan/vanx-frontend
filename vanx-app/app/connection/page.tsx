"use client";

import { useState } from "react";
import { Logo, Modal } from "@/components/shared";
import { LoadingIcon, LargeCheckIcon, FailureIcon } from "@/components/shared/icons";

type isConnecting = "connecting" | "connected" | "failed";

export default function Connection() {
  const [connectionState, setConnectionState] = useState<isConnecting>("failed");

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
            <LoadingIcon className="animate-spin"/>
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
              onClick={() => setConnectionState("connecting")} // connectionStateを"connecting"に変更
            >
              もう一度接続
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}
