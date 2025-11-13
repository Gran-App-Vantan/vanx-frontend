"use client";

import { useState } from "react";
import { Button, ReturnButton } from "@/components/shared";
import { Modal } from "@/components/shared";
import { LessThanIcon } from "@/components/shared/icons";
import Image from 'next/image';

export default function RuleBook() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);
  const currentStep = page - 1;

  console.log(page, "page");

  const StepsIndianPoker = [
    { 
      TopText :"インディアンポーカーとは",
      image : "/rule/GameImage1.png",
      imagewidth : 261,
      imageheight : 172,
      BottomText1 : "相手より高い数字のカードを",
      BottomText2 : "予想して勝利を目指します",
      BottomText3 : "みんなで話し騙しあいましょう",
    },

    { 
      TopText :"掛金を決めよう！！",
      image : "/rule/GameImage2.png",
      imagewidth : 261,
      imageheight : 172,
      BottomText1 : "親PCで掛金を決めれます",
      BottomText2 : "ここもみんなで話し合いを掛金を",
      BottomText3 : "決めましょう",
    },

    { 
      TopText :"カードが配られたら話し合おう",
      image : "/rule/GameImage3.png",
      imagewidth : 261,
      imageheight : 172,
      BottomText1 : "話し合いは5分 延長もできます",
      BottomText2 : "自分のカードが弱いと思ったら",
      BottomText3 : "変更しよう",
    },

    { 
      TopText :"カードの強さは？",
      image : "/rule/GameImage4.png",
      imagewidth : 261,
      imageheight : 172,
      BottomText1 : "左から右に向けて強くなります",
      BottomText2 : "強いカードを引き当てて",
      BottomText3 : "相手を怖がらせましょう",
    },

    { 
      TopText :"勝利を目指して頑張ろう",
      image : "/rule/GameImage5.png",
      imagewidth : 261,
      imageheight : 172,
      BottomText1 : "相手より高い数字のカードを引いて",
      BottomText2 : "優勝目指して頑張ろう",
    }

  ]

  return (
    <main>
      <div className="fixed top-0 left-0 w-screen z-50">
        <ReturnButton />
      </div>
      <div >
        <Modal
          size="rule-book"
          openModal={isOpen}
          onClose={() => setIsOpen(true)} // モーダルを閉じないようにする
        >
            <div className=' flex flex-col   gap-5 items-center justify-center bg-[url("/rule/BgImg.png")] bg-cover bg-center h-[620px] w-[350px] rounded-2xl'>
                    <h2 className='text-xl font-black bg-white/40'>
                        {StepsIndianPoker[currentStep].TopText}
                    </h2>

                    <Image
                        src={StepsIndianPoker[currentStep].image}
                        alt="game-image"
                        width={StepsIndianPoker[currentStep].imagewidth}
                        height={StepsIndianPoker[currentStep].imageheight}
                    />

                    <div className='text-base font-bold text-center bg-white/40'>
                        <p>{StepsIndianPoker[currentStep].BottomText1}</p>
                        <p>{StepsIndianPoker[currentStep].BottomText2}</p>
                        <p>{StepsIndianPoker[currentStep].BottomText3}</p>
                    </div>
            </div>
            <div
              className={`
                absolute bottom-0 flex w-full p-4
                ${page === 1 ? "justify-end" : "justify-between"}
              `}
            >
              {page > 1 && (
                <button
                  className="flex justify-center items-center w-11 h-11 bg-accent rounded-full"
                  onClick={() => setPage(page - 1)}
                >
                  <LessThanIcon className="rotate-180" />
                </button>
              )}
              {page < 5 && ( // ここでページ数の上限を設定
                <button
                  className="flex justify-center items-center w-11 h-11 bg-accent rounded-full"
                  onClick={() => setPage(page + 1)}
                >
                  <LessThanIcon />
                </button>
              )}
            </div>
        </Modal>
      </div>
    </main>
  );
}
