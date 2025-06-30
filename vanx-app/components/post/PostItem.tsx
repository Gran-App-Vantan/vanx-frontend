import Image from "next/image";

import { ReactionAddButton } from "./ReactionAddButton";
import { Post } from "@/api/posts/types";

export function PostItem({ post }: Post ) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-screen border-b-[0.5px] border-b-text-gray py-4 px-6">
      <div className="flex gap-6">
        <Image 
          src={post.imageSrc}
          alt="user-icon"
          width={50}
          height={50}
        />

        <div className="flex flex-col gap-2">
          <p className="font-small text-text-gray">
            {post.userId}
          </p>
          <h2 className="font-bold">
            {post.userName}
          </h2>
        </div>
      </div>

      <div>
        {post.contents}
      </div>

      <div className="flex justify-end">
        <ReactionAddButton postReactions={post.postReactions}/>
      </div>
    </div>
  );
}