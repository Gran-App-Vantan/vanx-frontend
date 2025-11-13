import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div>
      <Link href="/">
        <Image src="/logo.svg" alt="VANX" width={130} height={35} />
      </Link>
    </div>
  );
}
