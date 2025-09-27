import Image from "next/image";
import { Reaction } from "@/api/post/types";

type ReactionAddButtonProps = {
  postReactions: Reaction[];
  onClick: () => void;
};

export function ReactionAddButton({
  postReactions,
  onClick,
}: ReactionAddButtonProps) {
  return (
    <div>
      {postReactions.map((reaction) => (
        <button
          key={reaction.id}
          onClick={onClick}
          className="flex justify-center items-center w-[50px] h-[30px] bg-gray rounded-full cursor-pointer"
        >
          <Image
            className="w-5 h-5"
            src={reaction.reactionImageSrc}
            alt={reaction.reactionName}
            width={24}
            height={24}
          />
        </button>
      ))}
    </div>
  );
}
