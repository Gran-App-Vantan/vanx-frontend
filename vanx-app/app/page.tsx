"user client";

import { PostItem } from "@/components/post";
import { FooterNavItem } from "@/components/shared";

// 仮データの皆さん
const posts = [
  {
    id: 1,
    userId: "junpeichan@0310",
    userName: "じゅんぺいちゃん",
    imageSrc: "/icons/user-icon.svg",
    contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
    postReactions: {
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
      reactionType: "emoji" as "emoji",
    }
  },
  {
    id: 2,
    userId: "junpeichan@0310",
    userName: "じゅんぺいちゃん",
    imageSrc: "/icons/user-icon.svg",
    contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
    postReactions: {
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
      reactionType: "emoji" as "emoji",
    }
  },
  {
    id: 3,
    userId: "junpeichan@0310",
    userName: "じゅんぺいちゃん",
    imageSrc: "/icons/user-icon.svg",
    contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
    postReactions: {
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
      reactionType: "emoji" as "emoji",
    }
  },
  {
    id: 4,
    userId: "junpeichan@0310",
    userName: "じゅんぺいちゃん",
    imageSrc: "/icons/user-icon.svg",
    postContents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
    postReactions: {
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
      reactionType: "emoji" as "emoji",
    }
  },
  {
    id: 5,
    userId: "junpeichan@0310",
    userName: "じゅんぺいちゃん",
    imageSrc: "/icons/user-icon.svg",
    postContents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
    postReactions: {
      reactionName: "平常心",
      reactionImageSrc: "/icons/reaction-icon.svg",
      reactionType: "emoji" as "emoji",
    }
  },
]

export default function Home() {
  return (
    <>
      <main>
        <div className="absolute top-24">
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <PostItem
                  post={{
                    id: post.id,
                    userId: post.userId,
                    userName: post.userName,
                    imageSrc: post.imageSrc,
                    contents: post.contents ?? post.postContents ?? "",
                    postReactions: [post.postReactions],
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>

      <FooterNavItem />
    </>
  )
}