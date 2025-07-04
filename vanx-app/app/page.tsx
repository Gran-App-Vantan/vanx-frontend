"use client";

import Image from 'next/image';
import { Button } from "@/components/shared/Button";
import { PostItem } from "@/components/post";
import { FooterNavItem } from "@/components/shared";

// 仮データ（ユーザー情報）
const commonUser = {
  userId: "junpeichan@0310",
  userName: "じゅんぺいちゃん",
  imageSrc: "/icons/user-icon.svg",
};

// 仮データ（リアクション情報）
const commonReaction = {
  reactionName: "平常心",
  reactionImageSrc: "/icons/reaction-icon.svg",
  category: "emoji" as const,
};

// 投稿一覧（仮データで5件分作成）
const posts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  ...commonUser,
  contents: "実はGran App Vantanの「Gran」はグランアレグリアから取ったんです。ご存じでしたか？",
  postReactions: [
    {
      id: i + 1,
      ...commonReaction,
    },
  ],
}));

export default function Home() {
  return (
    <>
      <main>
        <div className="absolute top-24">
          <ul>
            {posts.map((post) => {
              const normalizedPost = {
                ...post,
                contents: post.contents ?? "",
              };

              return (
                <li key={post.id}>
                  <PostItem post={normalizedPost} />
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <FooterNavItem />
      <Button
        buttonType="redButton"
        size="l"
        text="登録"
        className="shadow-top"
      />
    </>
  );
}