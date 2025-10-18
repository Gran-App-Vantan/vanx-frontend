import Image from "next/image";
import { PostReaction } from "@/api/post/types";

export function ReactionAddButton({ onClick }: { onClick: () => void; }) {

  return (
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
  );
}
