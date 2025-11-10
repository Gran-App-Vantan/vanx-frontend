"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo, Modal } from "@/components/shared";
import { useUser } from "@/contexts/UserContext";
import { LoadingIcon, LargeCheckIcon, FailureIcon } from "@/components/shared/icons";
import { TokenCheck, AccountLink } from "@/api/game";

type isConnecting = "connecting" | "connected" | "failed";

export default function Connection() {
  const { user } = useUser();
  const params = useParams<{ token: string }>();
  const [gameUserId, setGameUserId] = useState<number>(0);
  const [connectionState, setConnectionState] =
    useState<isConnecting>("connecting");

  const tokenCheck = async () => {
    try {
      const response = await TokenCheck(params.token);

      if (response.success) {
        setGameUserId(response.data.userId);

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

  const accountLink = async () => {
    if (!user?.id || !gameUserId) {
      console.error("ユーザー情報が不足しています", { userId: user?.id, gameUserId });
      return;
    }
    
    try {
      await AccountLink({
        userId: user.id,
        snsId: gameUserId,
        point: user.point
      });
      console.log("アカウント接続に成功しました");
    } catch (error) {
      console.error("アカウントの接続に失敗しました", error);
      setConnectionState("failed");
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (connectionState === "connected" && user?.id && gameUserId) {
      accountLink();
    }
  }, [connectionState, user?.id, gameUserId]);

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
