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
      console.log("TokenCheck 開始:", params.token);
      const response = await TokenCheck(params.token);
      console.log("TokenCheck レスポンス:", response);

      if (response.success) {
        setGameUserId(response.data.userId);

        console.log("トークンの確認に成功しました", { gameUserId: response.data.userId });
        setConnectionState("connected");
      } else {
        console.error("トークンの確認に失敗しました");
        setConnectionState("failed");
      }
    } catch (error) {
      console.error("TokenCheck エラー: ", error);
      setConnectionState("failed");
    }
  }

  const accountLink = async () => {
    console.log("accountLink 開始", { userId: user?.id, gameUserId, point: user?.point });
    
    if (!user?.id || !gameUserId) {
      console.error("ユーザー情報が不足しています", { userId: user?.id, gameUserId });
      return;
    }
    
    try {
      console.log("AccountLink 呼び出し直前", {
        userId: gameUserId,
        snsId: user.id,
        point: user.point
      });
      
      const response = await AccountLink({
        userId: gameUserId,  // ゲームユーザーID (1~4)
        snsId: user.id,      // SNSユーザーID
        point: user.point
      });
      console.log("AccountLink レスポンス:", response);
      console.log("アカウント接続に成功しました");
      
      // 接続成功を維持（ゲーム側で待機画面が表示されるまでこの画面を表示）
      // ユーザーは手動でこのタブを閉じることができる
    } catch (error) {
      console.error("アカウントの接続に失敗しました", error);
      setConnectionState("failed");
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    console.log("useEffect [connectionState, user, gameUserId]", {
      connectionState,
      userId: user?.id,
      gameUserId
    });
    
    if (connectionState === "connected" && user?.id && gameUserId) {
      console.log("条件満たしたのでaccountLink呼び出し");
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
              <p>接続に成功しました!</p>
              <p className="mt-2">ゲーム画面に戻って</p>
              <p>ゲームをお楽しみください!</p>
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
