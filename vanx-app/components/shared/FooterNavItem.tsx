import Link from "next/link";
import Image from "next/image";

import { PostingButton } from "@/components/post";

export function FooterNavItem() {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-base p-5 shadow-top rounded-tr-xl rounded-tl-xl">
      <nav>
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/">
              {/* アイコンは仮設置 */}
              <Image
                src="/icons/reaction-icon.svg"
                alt="HomeIcon"
                width={30}
                height={30}
              />

              {/* HomeIcon Component */}
            </Link>
          </li>

          <li>
            <Link href="/floor-map">
               {/* アイコンは仮設置 */}
              <Image
                src="/icons/reaction-icon.svg"
                alt="FloorMapIcon"
                width={30}
                height={30}
              />

              {/* FloorMapIcon Component */}
            </Link>
          </li>

          <li>
            <Link href="/post">
              <PostingButton />
            </Link>
          </li>

          <li>
            <Link href="/point-detail">
              {/* アイコンは仮設置 */}
              <Image
                src="/icons/reaction-icon.svg"
                alt="PointIcon"
                width={30}
                height={30}
              />

              {/* PointIcon Component */}
            </Link>
          </li>

          <li>
            <Link href="/profile">
              {/* アイコンは仮設置 */}
              <Image
                src="/icons/reaction-icon.svg"
                alt="ProfileIcon"
                width={30}
                height={30}
              />

              {/* ProfileIcon */}
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}