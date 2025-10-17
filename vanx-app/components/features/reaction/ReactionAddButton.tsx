import Image from "next/image";
import { PostReaction } from "@/api/post/types";

type ReactionAddButtonProps = {
  postReactions: PostReaction[];
  onClick: () => void;
};

export function ReactionAddButton({
  postReactions,
  onClick,
}: ReactionAddButtonProps) {
  return (
    <div>
      {postReactions.length === 0 && 
        <button
          className="w-13 h-8 bg-gray rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => onClick()}
        >
          <Image 
            src="/icons/reaction-add-icon.svg"
            alt="reaction-add-icon"
            width={20}
            height={20}
          />
        </button>
      }
      {postReactions.map((reaction) => (
        <button
          key={reaction.id}
          onClick={() => onClick()}
          className="flex justify-center items-center w-[50px] h-[30px] bg-gray rounded-full cursor-pointer"
        >
          <Image
            className="w-5 h-5"
            src={reaction.reaction.reactionImageSrc}
            alt={reaction.reaction.reactionName}
            width={24}
            height={24}
          />
        </button>
      ))}
    </div>
  );
}
