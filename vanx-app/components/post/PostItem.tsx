import Image from "next/image";
import { Reaction } from "./Reaction";

type Props = {
  post: {
    id: number;
    userId: string;
    userName: string;
    imageSrc: string;
    contents: string;
    postReactions: {
      reactionName: string;
      reactionImageSrc: string;
      reactionType: "emoji" | "nature" | "food" | "activity" | "travel" | "symbols";
    }[];
  }
}

export function PostItem({ post }: Props ) {
  return (
    <div className="flex flex-col gap-2 w-full border-b-[0.5px] border-b-text-gray py-4 px-6">
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
        <Reaction postReactions={post.postReactions}/>
      </div>
    </div>
  );
}