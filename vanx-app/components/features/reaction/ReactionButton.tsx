import Image from "next/image";
import { Reaction } from "@/api/reaction";

type ReactionProps = {
  reaction: Reaction;
  onClick: () => void;
}

export function ReactionButton({ 
  reaction,
  onClick 
}: ReactionProps) {
  return (
    <div 
      className="flex items-center justify-center w-[50px] h-[30px] bg-gray rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image 
        src={reaction.reactionImage} 
        alt={reaction.reactionName} 
        width={20} 
        height={20} 
      />
    </div>
  );
}
