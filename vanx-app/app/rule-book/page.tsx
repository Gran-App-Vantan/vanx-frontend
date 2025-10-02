"use client";

import { useState } from "react";
import { ReturnButton } from "@/components/shared";
import { Modal } from "@/components/shared";
import { LessThanIcon } from "@/components/shared/icons";

export default function RuleBook() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  console.log(page, "page");

  return (
    <main>
      <div className="fixed top-0 left-0 w-screen z-50">
        <ReturnButton />
      </div>
      <div>
        <Modal
          size="rule-book"
          openModal={isOpen}
          onClose={() => setIsOpen(true)} // モーダルを閉じないようにする
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <h1>{page}ページ目です</h1>
            <div
              className={`
                absolute bottom-0 flex w-full
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
              {page < 4 && ( // ここでページ数の上限を設定
                <button
                  className="flex justify-center items-center w-11 h-11 bg-accent rounded-full"
                  onClick={() => setPage(page + 1)}
                >
                  <LessThanIcon />
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
