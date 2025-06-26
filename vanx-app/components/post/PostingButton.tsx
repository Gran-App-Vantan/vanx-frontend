import Image from "next/image";

export function PostingButton() {
  return (
    <button className="flex justify-center items-center bg-accent w-10 h-10 rounded-lg cursor-pointer">
    <Image
        src="/icons/puls-icon.svg"
        alt="PulsIcon"
        width={20}
        height={20}
      />
    </button>
  );
}