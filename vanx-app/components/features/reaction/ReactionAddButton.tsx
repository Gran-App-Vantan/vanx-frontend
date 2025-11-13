import Image from "next/image";

export function ReactionAddButton({ onOpen }: { onOpen: () => void; }) {

  return (
    <button
      className="flex justify-center items-center w-12 h-8 bg-gray rounded-full cursor-pointer"
      onClick={() => onOpen()}
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
