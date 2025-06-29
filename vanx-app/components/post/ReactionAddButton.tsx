import Image from "next/image"
import { Reactions } from "@/api/posts/types"

export function ReactionAddButton({ postReactions }: { postReactions: Reactions[] }) {
  return (
    <>
      {postReactions.map((reaction) => (
        <button
          key={reaction.id}
          className="flex justify-center items-center w-[50px] h-[30px] bg-gray rounded-full"
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
  )
}