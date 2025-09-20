import { ReturnButton } from "@/components/shared";
import Image from "next/image";

export default function ProfileEdit() {
  return (
    <main>
      <ReturnButton />
      <form className="flex flex-col justify-center mt-12">
        <div className="flex flex-col items-center gap-8">
          <Image
            className="border-[0.5px] border-text-gray rounded-full"
            src="/icons/default-user-icon.svg"
            alt="user-icon"
            width={100}
            height={100}
          />
          <button className="text-label text-accent">
            プロフィール画像を変更する
          </button>
        </div>
        <div className="flex flex-col items-center mt-8 gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="userId" className="ml-2 text-text text-label">
              ユーザーIDを編集
            </label>
            <input
              id="userId"
              type="text"
              className="w-72 h-11 border border-text-gray rounded-lg px-4 text-label outline-none"
              placeholder="新しいユーザーIDを入力"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="userName" className="ml-2 text-text text-label">
              ユーザー名を編集
            </label>
            <input
              id="userName"
              type="text"
              className="w-72 h-11 border border-text-gray rounded-lg px-4 text-label outline-none"
              placeholder="新しいユーザー名を入力"
              autoComplete="off"
            />
          </div>
        </div>
        <button className="flex justify-center items-center w-80 h-11 mt-30 mx-auto bg-accent text-white text-normal rounded-full">
          保存
        </button>
      </form>
    </main>
  );
}
