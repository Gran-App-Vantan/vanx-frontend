"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/shared";

export default function Post() {
  const [previewFiles, setPreviewFiles] = useState<{ url: string, type: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const urlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      urlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
      urlsRef.current.clear();
    };
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    replaceIndex: number | null = null
  ) => {
    const files = e.target.files;

    if (files) {
      const maxSize = 50 * 1024 * 1024;
      const validFiles = Array.from(files).filter(file => {
        if (file.size > maxSize) {
          alert(`"${file.name}" のサイズが大きすぎます。50MB以下のファイルを選択してください。`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const newPreviews = validFiles.map((file) => {
        const url = URL.createObjectURL(file);
        urlsRef.current.add(url);

        return {
          url,
          type: file.type,
        };
      });

      if (replaceIndex !== null) {
        setPreviewFiles((prev) => {
          const oldUrl = prev[replaceIndex].url;
          URL.revokeObjectURL(oldUrl);
          urlsRef.current.delete(oldUrl);
          
          return prev.map((file, i) => (i === replaceIndex ? newPreviews[0] : file));
        });
      } else {
        setPreviewFiles((prev) => {
          const updated = [...prev, ...newPreviews];
          setCurrentIndex(updated.length - 1);
          return updated;
        });
      }
    }
  };

  const removePreview = (index: number) => {
    setPreviewFiles((prev) => {
      const urlToRevoke = prev[index].url;
      URL.revokeObjectURL(urlToRevoke);
      urlsRef.current.delete(urlToRevoke);
      
      const updated = prev.filter((_, i) => i !== index);

      if (updated.length === 0) {
        setCurrentIndex(0);
      } else if (index <= currentIndex && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (currentIndex >= updated.length) {
        setCurrentIndex(updated.length - 1);
      }
      return updated;
    });
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
            <div className="w-[350px] mx-auto p-4 bg-cover bg-center bg-no-repeat border border-text-gray rounded-lg overflow-hidden">

              <div className="relative">

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center bg-text-gray text-white text-label h-8 py-1 px-4 cursor-pointer rounded-full">
                    <input 
                      type="file" 
                      className="hidden"
                      onChange={(e) => handleFileChange(e, currentIndex)}
                    />
                    ファイルを変更
                  </label>

                  <button
                    className="bg-text-gray rounded-full p-1 cursor-pointer"
                    type="button"
                    onClick={() => removePreview(currentIndex)}
                  >
                    <Image
                      src="/icons/close-icon.svg"
                      alt="close-icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                <div className="relative">

                  {previewFiles.length > 1 && currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex(currentIndex - 1)}
                      aria-label="前のファイルを表示"
                      className="absolute flex left-2 top-1/2 w-10 h-10 items-center justify-center transform -translate-y-1/2 z-10 bg-text-gray bg-opacity-50 text-white rounded-full p-2 shadow-bottom cursor-pointer hover:bg-opacity-70 transition-opacity"
                    >
                      <span className="text-lg">
                        {/* <Image 
                          src="/icons/less-than-icon.svg"
                          alt="arrow-icon"
                          width={16}
                          height={16}
                        /> */}
                        ←
                      </span>
                    </button>
                  )}

                  {previewFiles.length > 1 && currentIndex < previewFiles.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                      aria-label="次のファイルを表示"
                      className="absolute flex right-2 top-1/2 w-10 h-10 items-center justify-center transform -translate-y-1/2 z-10 bg-text-gray bg-opacity-50 text-white rounded-full p-2 shadow-bottom cursor-pointer hover:bg-opacity-70 transition-opacity"
                    >
                      <span className="text-lg">
                        {/* <Image 
                          src="/icons/less-than-icon.svg"
                          alt="arrow-icon"
                          width={16}
                          height={16}
                        /> */}
                        →
                      </span>
                    </button>
                  )}

                  <div className="flex items-center justify-center h-[420px]">
                    {previewFiles[currentIndex] && previewFiles[currentIndex].type?.startsWith("video") ? (
                      <video
                        src={previewFiles[currentIndex].url}
                        controls
                        className="rounded-lg max-w-[350px] max-h-[400px] w-full h-auto object-contain"
                      />
                    ) : previewFiles[currentIndex] && previewFiles[currentIndex].type?.startsWith("image") ? (
                      <Image
                        src={previewFiles[currentIndex].url}
                        alt="画像が読み込めませんでした"
                        width={350}
                        height={400}
                        className="pointer-events-none select-none rounded-lg text-label max-h-[400px] object-contain"
                      />
                    ) : (
                      <div className="text-label text-center">
                        ファイルが読み込めませんでした。
                      </div>
                    )}
                  </div>

                  {previewFiles.length > 1 && (
                    <div className="flex justify-center mt-3 gap-2">
                      {previewFiles.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === currentIndex ? 'bg-accent' : 'bg-text-gray'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
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