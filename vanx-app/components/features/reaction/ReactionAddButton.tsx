import Image from "next/image";
import { PostReaction } from "@/api/post/types";
import { ReactionButton } from "./ReactionButton";

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
          className="flex justify-center items-center w-12 h-8 bg-gray rounded-full cursor-pointer"
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
        <ReactionButton
          key={reaction.reactionId}
          reaction={reaction.reaction}
          onClick={() => onClick()}
        />
      ))}
    </div>
  );
}
