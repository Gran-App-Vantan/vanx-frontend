import Image from "next/image";
import { Reaction } from "@/api/reaction";

type ReactionProps = {
  reaction: Reaction;
  count: number;
  isOwnReaction: boolean;
  onAdd: () => void;
}

export function ReactionButton({ 
  reaction,
  count,
  isOwnReaction,
  onAdd
}: ReactionProps) {
  return (
    <div 
      className={
        `flex items-center justify-center gap-1.5 w-[50px] h-[30px] rounded-full cursor-pointer
        ${isOwnReaction
          ? "border-blue-400 border-2 bg-blue-100" 
          : "bg-gray"
        }
      `}
      onClick={() => onAdd()}
    >
      <Image 
        src={reaction.reactionImage} 
        alt={reaction.reactionName} 
        width={20} 
        height={20} 
      />
      <span 
        className={`
          text-small
          ${isOwnReaction
            ? "text-blue-600 font-bold"
            : "text-text"
          }
        `}
      >
        {count}
      </span>
    </div>
  );
}
