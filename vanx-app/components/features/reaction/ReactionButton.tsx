import Image from "next/image";
import { Reaction } from "@/api/reaction";

type ReactionProps = {
  reaction: Reaction;
  count: number;
  onAdd: () => void;
}

export function ReactionButton({ 
  reaction,
  count,
  onAdd
}: ReactionProps) {
  return (
    <div 
      className="flex items-center justify-center gap-1.5 w-[50px] h-[30px] bg-gray rounded-full cursor-pointer"
      onClick={() => onAdd()}
    >
      <Image 
        src={reaction.reactionImage} 
        alt={reaction.reactionName} 
        width={20} 
        height={20} 
      />
      <span className="text-small text-text">
        {count}
      </span>
    </div>
  );
}
