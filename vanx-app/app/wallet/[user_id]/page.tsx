import Link from "next/link";
import Image from "next/image";
import { LeftArrowIcon } from "@/components/shared/icons";

export default function Wallet() {
  return (
    <main>
      <div>
        <Link href="/">
          <LeftArrowIcon  color="black"/>
          戻る
        </Link>
        <div>
          <Image 
            src="/icons/default-user-icon.svg"
            alt="default-user-icon"
            width={50}
            height={50}
          />
          <p>じゅんぺいちゃん</p> {/* name */}
        </div>
        <div>
          <p>現在のポイント</p>
          <p>1,000P</p>
        </div>
      </div>
      <div>
        <div>
          <div>
            <button>すべて</button>
          </div>
          <div>
            <button>獲得ポイント</button>
          </div>
          <div>
            <button>損失ポイント</button>
          </div>
        </div>
        <ul>
          
        </ul>
      </div>
    </main>
  );
}