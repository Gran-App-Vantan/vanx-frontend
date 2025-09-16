"use client";

import Image from "next/image";
import Link from "next/link";
import { EditIcon, LessThanIcon } from "@/components/shared/icons";

export function ProfileHead() {
  return (
    <div className="pt-6 pb-4 px-6 bg-accent-light flex flex-col gap-8 shadow-bottom">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <div className="size-12">
            <Image
              src="/icons/default-user-icon.svg"
              alt="user-icon"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="font-sans ">
            <p className="text-small not-italic font-normal text-text-gray">
              junpeichan@0310
            </p>
            <p className=" text-normal font-bold">じゅんぺいちゃん</p>
          </div>
        </div>

        <div>
          <Link
            href="/edit"
            className="flex items-center text-text-gray bg-gray rounded-full py-2 px-4  gap-2"
          >
            <p>編集</p>
            <EditIcon />
          </Link>
        </div>
      </div>
      <div className="flex justify-end gap-6 text-label items-center">
        <p className="pt-2 text-h3">100位</p>
        <Link
          href="/rankings"
          className="p-2 flex items-center gap-2 bg-accent text-accent-light rounded"
        >
          <p>ランキングを見る</p>
          <LessThanIcon />
        </Link>
      </div>
    </div>
  );
}
