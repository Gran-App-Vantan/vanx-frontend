"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared";
import { LeftArrowIcon, CloseIcon, LessThanIcon, } from "@/components/shared/icons";
import { postStore } from "@/api/post/postStore";
import { useFilePreview } from "@/hooks/usePreviewFile";
import { useAuth } from "@/hooks/useAuth";

export default function Post() {
  useAuth(); // 認証チェック
  const router = useRouter();
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    previewFiles,
    currentIndex,
    setCurrentIndex,
    addFiles,
    removeFile,
  } = useFilePreview({
    maxFiles: 5,
    maxFileSize: 2 * 1024 * 1024, // 2MB
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    replaceIndex: number | null = null
  ) => {
    const files = e.target.files;
    
    if (files) {
      await addFiles(files, replaceIndex);
    }
    
    // inputをリセット
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // ファイルサイズの最終チェック
      const MAX_FILE_SIZE = 2 * 1024 * 1024;
      const oversizedFiles = previewFiles.filter(file => file.file && file.file.size > MAX_FILE_SIZE);
      
      if (oversizedFiles.length > 0) {
        const fileNames = oversizedFiles.map(f => f.file?.name).join(", ");
        alert(`以下のファイルがサイズ制限（2MB）を超えています: ${fileNames}`);
        return;
      }

      const formData = new FormData();
      formData.append("content", postContent);

      previewFiles.forEach((previewFile) => {
        if (previewFile.file) {
          formData.append("files[]", previewFile.file);
        }
      });

      const response = await postStore(formData);

      if (response.success) {
        alert("投稿が完了しました");
        router.push("/");
      } else {
        console.error("投稿失敗:", response);
        alert(`投稿に失敗しました: ${response.message}`);
      }
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿処理中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="flex items-center w-screen bg-accent text-white p-3 h-16">
        <Link className="flex items-center gap-2.5" href={"/"}>
          <LeftArrowIcon color="white" />
          戻る
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-6 mt-20">
          <h1 className="text-center text-h3">
            あなたのことを知らせてあげましょう！
          </h1>

          <textarea
            name="postContent"
            className="w-[350px] h-[150px] p-5 mt-5 mx-auto bg-white text-normal text-text border border-text-gray rounded-lg resize-none"
            placeholder="今、何してる？"
            autoComplete="off"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
                    onClick={() => removeFile(currentIndex)}
                  >
                    <CloseIcon />
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
                        <LessThanIcon className="transform rotate-180" />
                      </span>
                    </button>
                  )}

                  {previewFiles.length > 1 &&
                    currentIndex < previewFiles.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                        aria-label="次のファイルを表示"
                        className="absolute flex right-2 top-1/2 w-10 h-10 items-center justify-center transform -translate-y-1/2 z-10 bg-text-gray bg-opacity-50 text-white rounded-full p-2 shadow-bottom cursor-pointer hover:bg-opacity-70 transition-opacity"
                      >
                        <span className="text-lg">
                          <LessThanIcon />
                        </span>
                      </button>
                    )}

                  <div className="flex items-center justify-center h-[420px]">
                    {previewFiles[currentIndex] &&
                    previewFiles[currentIndex]?.type?.startsWith("video") ? (
                      <video
                        key={previewFiles[currentIndex].id}
                        src={previewFiles[currentIndex].url}
                        controls
                        className="rounded-lg max-w-[350px] max-h-[400px] w-full h-auto object-contain"
                      />
                    ) : previewFiles[currentIndex] &&
                      previewFiles[currentIndex]?.type?.startsWith("image") ? (
                      <Image
                        key={previewFiles[currentIndex].id}
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
                      {previewFiles.map((file, index) => (
                        <button
                          key={file.id}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === currentIndex
                              ? "bg-accent"
                              : "bg-text-gray"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {previewFiles.length < 5 && (
                <div className="flex flex-col items-center gap-2 mt-4">
                  <label className="flex justify-center items-center mx-auto w-full gap-2 py-2 rounded-full bg-accent cursor-pointer text-center text-label text-white">
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
                  <div className="text-xs text-text-gray text-center">
                    1ファイル2MB以下
                  </div>
                </div>
              )}

              {previewFiles.length >= 5 && (
                <div className="flex justify-center items-center mx-auto mt-4 w-full py-2 rounded-full bg-text-gray text-center text-label text-white">
                  ファイルは最大5つまでです
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-[350px] h-[140px] mx-auto text-label border-2 border-dotted border-text-gray rounded-lg">
              <label className="text-text-gray">
                写真や動画を追加したいですか？
              </label>

              <label className="text-white bg-accent py-2 px-8 rounded-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple
                />
                ファイルをアップロード
              </label>
              
              <div className="text-xs text-text-gray text-center">
                最大5ファイル / 1ファイル2MB以下
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center my-24">
          <Button 
            buttonType="redButton" 
            text="投稿" 
            size="l" 
            type="submit"
          />
        </div>
      </form>
    </main>
  );
}
