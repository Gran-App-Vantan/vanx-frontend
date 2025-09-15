import Link from "next/link";
import Image from "next/image";
import { LeftArrowIcon } from "@/components/shared/icons";
import { PointLogItem } from "@/components/features/wallet";

const testItems = [
  {
    time: "06/05 10:01",
    name: "インディアンポーカー",
    point: 80000,
    isPuls: false,
  },
  {
    time: "06/05 10:11",
    name: "ルーレット",
    point: 500,
    isPuls: true,
  },
]

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
          {testItems.map((item, i) => {
            return (
              <li key={i}>
                <PointLogItem
                  time={item.time}
                  boothName={item.name}
                  point={item.point}
                  isPuls={item.isPuls}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}