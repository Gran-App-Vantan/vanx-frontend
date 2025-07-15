"use client";
import { useRouter } from "next/navigation";

export function ReturnButton() {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    return (
        <div className="bg-accent text-white p-3 flex justify-start items-center">
            <button onClick={handleClick}>←戻る</button>
        </div>
    );
}