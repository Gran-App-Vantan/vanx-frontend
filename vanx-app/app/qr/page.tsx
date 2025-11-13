'use clinet'

import { useEffect, useState } from "react"
import Image from "next/image";
// import { Button } from "@/components/shared/Button"

// interface ApiResponse {
//     success: boolean
//     message: string
//     data?: {
//         getPoint: number
//         newMyPoint: number
//     }
// }

export default function QRPage() {
    return (
        <main className="bg-[rgba(154,154,154,0.5)] w-full h-screen">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] py-[62px] bg-white rounded-[16px] text-center">
                <Image
                    width={64}
                    height={64}
                    className="object-contain mx-auto"
                    src={"icons/large-check-icon.svg"}
                    alt={"icon"}
                />
                <p className="mt-[16px]">???ポイントゲット！</p>
                <p className="mt-[8px]">ゲームをお楽しみください！</p>
                {/* <Button buttonType="redButton" text="トップに戻る" size="m"></Button> */}
            </div>
        </main>
    )
}