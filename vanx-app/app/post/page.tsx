"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/shared";

export default function Post() {
  const [previewFiles, setPreviewFiles] = useState<{ url: string, type: string }[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    replaceIndex: number | null = null
  ) => {
    const files = e.target.files;

    if (files) {
      const newPreviews = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      }));

      if (replaceIndex !== null) {
        setPreviewFiles((prev) =>
          prev.map((file, i) => (i === replaceIndex ? newPreviews[0] : file))
        );
      } else {
        setPreviewFiles((prev) => [...prev, ...newPreviews]);
      }
    }
  };

  const removePreview = (index: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main>
      <div className="w-screen flex items-center bg-accent text-white p-3 h-16">

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
        <div className="flex flex-col justify-center gap-6 mt-20">
          <h1 className="text-center text-h3">あなたのことを知らせてあげましょう！</h1>

          <textarea
            name="postContent"
            className="w-[350px] h-[150px] p-5 mt-5 mx-auto bg-white text-normal text-text border border-text-gray rounded-lg resize-none"
            placeholder="今、何してる？"
            autoComplete="off"
          />
          
          {previewFiles.length > 0 ? (
            <div className="w-[350px] mx-auto p-4 bg-cover bg-center bg-no-repeat border border-text-gray rounded-lg">
              <ul className="flex">
                {previewFiles.map((file, i) => (
                  <li 
                    key={i}
                    className="w-[350px]"
                  >

                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center bg-text-gray text-white text-label h-8 py-1 px-4 cursor-pointer rounded-full">
                        <input 
                          type="file" 
                          className="hidden"
                          onChange={(e) => handleFileChange(e, i)}
                        />
                        ファイルを変更
                      </label>

                      <button
                        className="bg-text-gray rounded-full p-1 cursor-pointer"
                        type="button"
                        onClick={() => {removePreview(i)}}
                      >
                        <Image
                          src="/icons/close-icon.svg"
                          alt="close-icon"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <div>
                      {file.type?.startsWith("video") ? (
                        <video
                          src={file.url}
                          controls width={350}
                          className="rounded-lg"
                        />
                      ) : file.type?.startsWith("image") ? (
                        <Image
                          src={file.url}
                          alt="画像が読み込めませんでした"
                          width={350}
                          height={115}
                          className="pointer-events-none select-none rounded-lg text-label"
                        />
                      ) : (
                        <div className="text-label text-center">
                          ファイルが読み込めませんでした。
                        </div>
                      )}
                    </div>

                  </li>
                ))}
              </ul>
              
              <label
                className="flex justify-center items-center mx-auto mt-4 w-full gap-2 py-2 rounded-full bg-accent cursor-pointer text-center text-label text-white"
              >
                さらにファイルを追加
                <Image 
                  src="/icons/puls-icon.svg"
                  alt="puls-icon"
                  width={16}
                  height={16}
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-[350px] h-[115px] mx-auto text-label border-2 border-dotted border-text-gray rounded-lg">
              <label className="text-text-gray">写真や動画を追加したいですか？</label>

              <label
                className="text-white bg-accent py-2 px-8 rounded-full cursor-pointer"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple
                />
                ファイルをアップロード
              </label>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center my-24">
          <Button
            buttonType="redButton"
            text="投稿"
            size="l"
          />
        </div>
      </form>
    </main>
  );
}