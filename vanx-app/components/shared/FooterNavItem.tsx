import Link from "next/link";

import { PostingButton } from "@/components/features/post";
import { HomeIcon, FloorMapIcon, PointIcon, ProfileIcon } from "./icons";

export function FooterNavItem() {
  return (
    <footer className="fixed bottom-0 z-40 w-full min-w-screen bg-white p-5 shadow-top rounded-tr-xl rounded-tl-xl">
      <nav>
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/">
              <HomeIcon />
            </Link>
          </li>

          <li>
            <Link href="/floor-map">
              <FloorMapIcon />
            </Link>
          </li>

          <li>
            <Link href="/post">
              <PostingButton />
            </Link>
          </li>

          <li>
            <Link href="/wallet">
              <PointIcon />
            </Link>
          </li>

          <li>
            <Link href="/profile">
              <ProfileIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}