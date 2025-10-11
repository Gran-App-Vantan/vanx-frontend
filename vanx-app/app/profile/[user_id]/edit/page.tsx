"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReturnButton } from "@/components/shared";
import { profileUpdate } from "@/api/profile/profileUpdate";
import { ProfileUpdateParams } from "@/api/profile";
import { useFilePreview } from "@/hooks/usePreviewFIle";
import { useUser } from "@/contexts/UserContext";

export default function ProfileEdit() {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const [formValues, setFormValues] = useState<ProfileUpdateParams>({
    name: "",
    userPath: "",
    userIcon: ""
  });

  const {
    previewFiles,
    addFiles,
  } = useFilePreview({
    maxFiles: 1,
    maxFileSize: 2 * 1024 * 1024,
    acceptedTypes: ["image/*"] // 画像のみ
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files) {
      await addFiles(files);
    }
    
    // inputをリセット
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', formValues.name);
    
    if (previewFiles[0]?.file) {
      formData.append('user_icon', previewFiles[0].file);
    }

    const response = await profileUpdate(formData);

    if (response.success) {
      await fetchUser();
      router.push(`/profile/${user?.id}`);
    }
  };

  useEffect(() => {
    if (previewFiles[0]?.base64Data) {
      setFormValues(prev => ({
        ...prev,
        userIcon: previewFiles[0].base64Data!
      }));
    }
  }, [previewFiles]);
  
  return (
    <main>
      <ReturnButton />
      <form 
        className="flex flex-col justify-center mt-28"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-[100px] h-[100px] border-[0.5px] border-text-gray rounded-full overflow-hidden">
            <Image
              src={previewFiles[0]?.url || "/icons/default-user-icon.svg"}
              alt="user-icon"
              fill
              className="object-cover"
            />
          </div>
          <label className="text-label text-accent cursor-pointer">
            <input 
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            プロフィール画像を変更する
          </label>
        </div>
        <div className="flex flex-col items-center mt-8 gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="userName" className="ml-2 text-text text-label">
              ユーザー名を編集
            </label>
            <input
              id="userName"
              type="text"
              className="w-72 h-11 border border-text-gray rounded-lg px-4 text-label outline-none"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              placeholder="新しいユーザー名を入力"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="ml-2 text-text text-label">
              パスワードを編集
            </label>
            <input
              id="password"
              type="text"
              className="w-72 h-11 border border-text-gray rounded-lg px-4 text-label outline-none"
              value={formValues.userPath}
              placeholder="新しいユーザーIDを入力"
              autoComplete="off"
              onChange={(e) => setFormValues({ ...formValues, userPath: e.target.value })}
            />
          </div>
        </div>
        <button className="flex justify-center items-center w-80 h-11 mt-30 mx-auto bg-accent text-white text-normal rounded-full cursor-pointer">
          保存
        </button>
      </form>
    </main>
  );
}
