import Image from "next/image";
import { ReactionStats } from "@/api/reaction";

type ReactionProps = {
  reaction: {
    count: number;
    image: string;
    name: string;
  }
  isOwnReaction: boolean;
  onAdd: () => void;
}

export function ReactionButton({ 
  reaction,
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
        src={reaction.image} 
        alt={reaction.name} 
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
        {reaction.count}
      </span>
    </div>
  );
}
