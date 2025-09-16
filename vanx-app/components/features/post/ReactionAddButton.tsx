import Image from "next/image";
import { Reactions } from "@/api/post/types";

type ReactionAddButtonProps = {
  postReactions: Reactions[];
  onClick: () => void;
};

export function ReactionAddButton({
  postReactions,
  onClick,
}: ReactionAddButtonProps) {
  return (
    <>
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
    </>
  );
}
