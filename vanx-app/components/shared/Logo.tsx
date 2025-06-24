import Image from "next/image"

export function Logo() {
  return (
    <div>
      <Image
        src="/logo.svg"
        alt="VANX"
        width={130}
        height={35}
      />
    </div>
  )
}