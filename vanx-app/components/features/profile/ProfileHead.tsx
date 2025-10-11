"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@/api/auth";
import { EditIcon, LessThanIcon } from "@/components/shared/icons";

export function ProfileHead({ user }: { user: User }) {
  console.log(user);
  return (
    <div className="pt-22 pb-4 px-6 bg-accent-light flex flex-col gap-8 shadow-bottom">
      <div className="flex justify-between">
        <div className="flex gap-6 justify-center">
          <div className="size-12">
            <Image
              src={
                user.userIcon
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.userIcon}`
                  : "/icons/default-user-icon.svg"
              }
              alt="user-icon"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center text-normal font-bold">
            {user.name}
          </div>
        </div>

        <div>
          <Link
            href={`/profile/${user.id}/edit`}
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
          ランキングを見る
          <LessThanIcon />
        </Link>
      </div>
    </div>
  );
}
