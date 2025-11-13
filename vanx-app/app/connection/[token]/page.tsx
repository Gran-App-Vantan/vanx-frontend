"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo, Modal } from "@/components/shared";
import { useUser } from "@/contexts/UserContext";
import { LoadingIcon, LargeCheckIcon, FailureIcon } from "@/components/shared/icons";
import { TokenCheck, AccountLink } from "@/api/game";

type isConnecting = "connecting" | "connected" | "failed";

interface ErrorDetail {
  message: string;
  title?: string;
  canRetry?: boolean;
}

export default function Connection() {
  const { user, fetchUser } = useUser();
  const params = useParams<{ token: string }>();
  const [gameUserId, setGameUserId] = useState<number>(0);
  const [errorDetail, setErrorDetail] = useState<ErrorDetail | null>(null);
  const [connectionState, setConnectionState] =
    useState<isConnecting>("connecting");
  const [isUserReady, setIsUserReady] = useState(false);

  // ページ表示時に最新のユーザー情報を取得
  useEffect(() => {
    console.log("🔄 Connection: ページ表示時にユーザー情報を再取得");
    const loadUser = async () => {
      const userData = await fetchUser();
      console.log("📋 ユーザー情報読み込み完了:", userData);
      setIsUserReady(true);
    };
    loadUser();
  }, []);

  const tokenCheck = async () => {
    try {
      console.log("TokenCheck 開始:", params.token);
      console.log("現在のuserステート:", user);
      
      // ユーザー情報が取得できていない場合は待機
      if (!user?.id) {
        console.log("⚠️ ユーザー情報がまだ読み込まれていません。再取得します...");
        const userData = await fetchUser();
        
        // それでもユーザー情報がない場合はエラー
        if (!userData?.id) {
          console.error("❌ ユーザー情報の取得に失敗しました");
          setErrorDetail({
            title: "ログインが必要です",
            message: "ログインしてから再度QRコードを読み取ってください。",
            canRetry: false
          });
          setConnectionState("failed");
          return;
        }
        
        console.log("📋 現在ログイン中のユーザー (再取得後):", {
          userId: userData.id,
          userName: userData.name
        });
        
        // 再取得したユーザー情報を使用
        const response = await TokenCheck(params.token);
        console.log("TokenCheck レスポンス:", response);

        if (response.success) {
          // 返されたユーザー情報と取得したユーザー情報が一致するか確認
          if (response.data.userId !== userData.id) {
            console.error("❌ ユーザーIDの不一致を検出!", {
              期待: userData.id,
              実際: response.data.userId,
              現在のユーザー: userData.name,
              返されたユーザー: response.data.userName
            });
            setErrorDetail({
              title: "ユーザーの不一致を検出しました",
              message: `現在 ${userData.name} としてログイン中ですが、システムは ${response.data.userName} として認識しています。ログアウトして再度ログインしてください。`,
              canRetry: false
            });
            setConnectionState("failed");
            return;
          }
          
          console.log("✅ ユーザーID一致確認", {
            userId: response.data.userId,
            userName: response.data.userName
          });
          
          setGameUserId(response.data.deviceNumber);
          console.log("トークンの確認に成功しました", { gameUserId: response.data.deviceNumber });
          setConnectionState("connected");
        } else {
          console.error("トークンの確認に失敗しました");
          setErrorDetail({
            title: "接続に失敗しました",
            message: "トークンが無効です。もう一度QRコードを読み取ってください。",
            canRetry: true
          });
          setConnectionState("failed");
        }
        return;
      }
      
      console.log("📋 現在ログイン中のユーザー:", {
        userId: user.id,
        userName: user.name
      });
      
      const response = await TokenCheck(params.token);
      console.log("TokenCheck レスポンス:", response);

      if (response.success) {
        // 返されたユーザー情報と現在のユーザー情報が一致するか確認
        if (response.data.userId !== user.id) {
          console.error("❌ ユーザーIDの不一致を検出!", {
            期待: user.id,
            実際: response.data.userId,
            現在のユーザー: user.name,
            返されたユーザー: response.data.userName
          });
          setErrorDetail({
            title: "ユーザーの不一致を検出しました",
            message: `現在 ${user.name} としてログイン中ですが、システムは ${response.data.userName} として認識しています。ログアウトして再度ログインしてください。`,
            canRetry: false
          });
          setConnectionState("failed");
          return;
        }
        
        console.log("✅ ユーザーID一致確認", {
          userId: response.data.userId,
          userName: response.data.userName
        });
        
        // device_numberをゲームのuser_idとして使用
        setGameUserId(response.data.deviceNumber);

        console.log("トークンの確認に成功しました", { gameUserId: response.data.deviceNumber });
        setConnectionState("connected");
      } else {
        console.error("トークンの確認に失敗しました");
        setErrorDetail({
          title: "接続に失敗しました",
          message: "トークンが無効です。もう一度QRコードを読み取ってください。",
          canRetry: true
        });
        setConnectionState("failed");
      }
    } catch (error) {
      console.error("TokenCheck エラー: ", error);
      setErrorDetail({
        title: "接続に失敗しました",
        message: "ネットワークエラーが発生しました。もう一度お試しください。",
        canRetry: true
      });
      setConnectionState("failed");
    }
  }

  const accountLink = async () => {
    console.log("🔍 accountLink 開始", { 
      contextUser: user,
      userId: user?.id, 
      userName: user?.name,
      gameUserId, 
      point: user?.point 
    });
    
    if (!user?.id || !gameUserId) {
      console.error("❌ ユーザー情報が不足しています", { 
        userId: user?.id, 
        gameUserId,
        user: user 
      });
      return;
    }
    
    try {
      console.log("📤 AccountLink 呼び出し直前", {
        gameUserId: gameUserId,      // ゲームのデバイス番号 (1~4)
        snsUserId: user.id,          // SNSユーザーID
        snsUserName: user.name,      // SNSユーザー名（確認用）
        point: user.point
      });
      
      const response = await AccountLink({
        userId: gameUserId,  // ゲームユーザーID (1~4)
        snsId: user.id,      // SNSユーザーID
        point: user.point
      });
      console.log("✅ AccountLink レスポンス:", response);
      console.log("✅ アカウント接続に成功しました");
      
      // 接続成功を維持（ゲーム側で待機画面が表示されるまでこの画面を表示）
      // ユーザーは手動でこのタブを閉じることができる
    } catch (error: any) {
      console.error("アカウントの接続に失敗しました", error);
      
      // エラーコード別に適切なメッセージを設定
      if (error.statusCode === 409) {
        setErrorDetail({
          title: "このアカウントは既に連携済みです",
          message: "このユーザーは既に別のアカウントと連携されています。別のゲームプレイヤーでお試しいただくか、既存の連携を解除してください。",
          canRetry: false
        });
      } else if (error.statusCode === 400) {
        setErrorDetail({
          title: "連携できませんでした",
          message: "入力内容に誤りがあります。もう一度QRコードを読み取ってください。",
          canRetry: true
        });
      } else if (error.statusCode === 404) {
        setErrorDetail({
          title: "ユーザーが見つかりません",
          message: "ゲームプレイヤーが見つかりませんでした。もう一度QRコードを読み取ってください。",
          canRetry: true
        });
      } else {
        setErrorDetail({
          title: "接続に失敗しました",
          message: error.message || "予期しないエラーが発生しました。もう一度お試しください。",
          canRetry: true
        });
      }
      setConnectionState("failed");
    }
  }

  // ユーザー情報が読み込まれたらトークンチェックを実行
  useEffect(() => {
    if (isUserReady) {
      console.log("🚀 ユーザー情報準備完了。トークンチェック開始");
      tokenCheck();
    }
  }, [isUserReady]);

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
            {user && (
              <div className="mt-2 px-4 py-2 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-600">接続ユーザー:</p>
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
              </div>
            )}
          </div>
        ) : connectionState === "connected" ? (
          <div className="flex flex-col items-center gap-4">
            <LargeCheckIcon />
            <div className="text-normal text-text text-center">
              <p>接続に成功しました!</p>
              {user && (
                <p className="mt-2 font-bold text-accent">{user.name} として参加</p>
              )}
              <p className="mt-2">ゲーム画面に戻って</p>
              <p>ゲームをお楽しみください!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <FailureIcon />
            <div className="flex flex-col gap-2 items-center justify-center">
              <p className="text-lg font-bold text-text">
                {errorDetail?.title || "接続に失敗しました"}
              </p>
              <p className="text-sm text-text text-center px-4">
                {errorDetail?.message || "予期しないエラーが発生しました"}
              </p>
            </div>
            {errorDetail?.canRetry !== false && (
              <button
                className="flex justify-center items-center w-50 h-11 bg-accent text-white rounded-full mt-4"
                onClick={() => {
                  setErrorDetail(null);
                  setConnectionState("connecting");
                  tokenCheck();
                }}
              >
                もう一度接続
              </button>
            )}
            {errorDetail?.canRetry === false && (
              <p className="text-xs text-text/70 text-center px-4 mt-2">
                ゲーム画面に戻り、別のプレイヤーでお試しください
              </p>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
}
