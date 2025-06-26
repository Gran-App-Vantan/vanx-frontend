import Image from "next/image"

type Props = {
  postReactions: {
    reactionName: string;
    reactionImageSrc: string;
    reactionType: "emoji" | "nature" | "food" | "activity" | "travel" | "symbols";
  }[];
}

export function Reaction({ postReactions }: Props ) {
  return (
    <>
      {postReactions.map((reaction, i) => (
        <button
          key={i}
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