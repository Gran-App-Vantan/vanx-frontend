'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/Button"

export default function QRPage() {
    const { token } = useParams<{ token: string }>();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [earnedPoint, setEarnedPoint] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;

            const authToken = Cookies.get("authToken");

            // 未ログイン処理
            if (!authToken) {
                setMessage("認証トークンが見つかりません");
                setSuccess(false);
                return;
            }

            try {
                // データフェッチ
                const res = await axios.patch(
                    `${process.env.NEXT_PUBLIC_SNS_API_URL}/api/point-recovery/use-recovery`,
                    { token },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            Accept: "application/json",
                        },
                        validateStatus: () => true,
                    }
                );

                setMessage(res.data.message);
                setSuccess(res.data.success);

                // ポイント数がある場合だけ設定
                if (res.data.data?.earned_point) {
                    setEarnedPoint(res.data.data.earned_point);
                } else {
                    setEarnedPoint(null);
                }

            } catch (err: any) {
                setMessage("通信エラーが発生しました");
                setSuccess(false);
                setEarnedPoint(null);
            }
        };

        fetchData();
    }, [token]);

    return (
        <main className="bg-[rgba(154,154,154,0.5)] w-full h-screen">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] py-[62px] bg-white rounded-[16px] text-center">
                <Image
                    width={64}
                    height={64}
                    className="object-contain mx-auto"
                    src={
                        success === null
                            ? "../icons/loading-icon.svg"
                            : success
                                ? "../icons/large-check-icon.svg"
                                : "../icons/failure-icon.svg"
                    }
                    alt="icon"
                />
                <p className="mt-[16px]">{message || "ポイントを確認しています..."}</p>

                {success && earnedPoint !== null && (
                    <p className="mt-[8px]">{earnedPoint}ポイント獲得！</p>
                )}

                {!success && success !== null && (
                    <p className="mt-[8px]">ポイントは取得できませんでした</p>
                )}

                {success === null && <p className="mt-[8px]"></p>}

                {/* ホームへ戻るボタン */}
                <Link href="/">
                    <Button
                        buttonType="redButton"
                        text="ホームへ戻る"
                        size="custom"
                        className="px-[58px] py-[12px] mt-[16px]"
                    />
                </Link>
            </div>
        </main>
    );
}
