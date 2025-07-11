import Link from "next/link";
import Image from "next/image";

import { PostingButton } from "@/components/features/post";

export function FooterNavItem() {
  return (
    <footer className="fixed bottom-0 z-40 w-full min-w-screen bg-white p-5 shadow-top rounded-tr-xl rounded-tl-xl">
      <nav>
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/">
              <Image
                src="/icons/reaction-icon.svg"
                alt="HomeIcon"
                width={30}
                height={30}
              />

              {/* <HomeIcon /> */}
            </Link>
          </li>

          <li>
            <Link href="/floor-map">
              <Image
                src="/icons/reaction-icon.svg"
                alt="FloorMapIcon"
                width={30}
                height={30}
              />

              {/* <FloorMapIcon /> */}
            </Link>
          </li>

          <li>
            <Link href="/post">
              <PostingButton />
            </Link>
          </li>

          <li>
            <Link href="/point-detail">
              <Image
                src="/icons/reaction-icon.svg"
                alt="PointIcon"
                width={30}
                height={30}
              />

              {/* <PointIcon /> */}
            </Link>
          </li>

          <li>
            <Link href="/profile">
              <Image
                src="/icons/reaction-icon.svg"
                alt="ProfileIcon"
                width={30}
                height={30}
              />

              {/* <ProfileIcon /> */}
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}