import Image from "next/image";
import Link from "next/link";

import { ReactionAddButton } from "./ReactionAddButton";
import { Post } from "@/api/posts/types";

type PostItemProps = {
  post: Post["post"];
  onDelete: () => void;
  onClick: () => void;
}

export function PostItem({ 
  post, 
  onDelete, 
  onClick,
}: PostItemProps) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-screen border-b-[0.5px] border-b-text-gray py-4 px-6">
      <div className="flex gap-6">
        <Link href={`/users/${post.userId}`}>
          <Image
            src={post.imageSrc}
            alt="user-icon"
            width={50}
            height={50}
          />
        </Link>

        <div className="flex flex-col gap-2">
          <p className="font-small text-text-gray">
            {post.userId}
          </p>
          <h2 className="font-bold">
            {post.userName}
          </h2>
        </div>

        <div className="justify-self-end ml-auto">
          <button
            className="cursor-pointer"
            onClick={onDelete}
          >
            <Image
              src="/icons/delete-icon.svg"
              alt="delete-icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div>
        {post.contents}
      </div>

      <div className="flex justify-end">
        <ReactionAddButton 
          postReactions={post.postReactions}
          onClick={onClick}
        />
      </div>
    </div>
  );
}