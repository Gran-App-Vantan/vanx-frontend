"use client";
import { useRouter } from "next/navigation";

export function ReturnButton() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 left-0 bg-accent w-screen h-16 z-50 text-white px-4 flex justify-start items-center">
      <button 
        className="cursor-pointer"
        onClick={handleClick}
      >
        ← 戻る
      </button>
    </div>
  );
}
