import Link from "next/link";
import Image from "next/image";

export default function Post() {
  return (
    <main>
      <div className="w-screen">

        {/* <Image 
          src="/icons/arrow-white-icon.svg"
          alt="戻るアイコン"
          width={20}
          height={20}
        /> */}

        <Link href={"/"}>
          戻る
        </Link>
      </div>

      <form>
        <h1>あなたのことを知らせてあげましょう</h1>

        <input type="text" />
        
        <div>
          <label>写真や動画をアップロードしたいですか？</label>
          <button>ファイルをアップロード</button>
        </div>

        <div>
          <hr />

          <button>投稿</button>
        </div>
      </form>
    </main>
  );
}