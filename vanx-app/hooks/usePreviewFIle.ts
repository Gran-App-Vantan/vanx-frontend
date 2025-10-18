import { useState, useEffect, useRef } from "react";
import { UseFilePreviewOptions, PreviewFile } from "@/api/post/";

export const useFilePreview = (options: UseFilePreviewOptions = {}) => {
  const {
    maxFiles = 5,
    maxFileSize = 2 * 1024 * 1024, // 2MB
  } = options;

  const urlsRef = useRef<Set<string>>(new Set());
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const validateFiles = (files: FileList): File[] => {
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > maxFileSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        alert(
          `"${file.name}" のサイズが大きすぎます。\nファイルサイズ: ${fileSizeMB}MB\n制限: ${maxFileSize / (1024 * 1024)}MB以下のファイルを選択してください。`
        );
        return false;
      }
      return true;
    });

    return validFiles;
  };

  const addFiles = async (
    files: FileList,
    replaceIndex: number | null = null
  ): Promise<boolean> => {
    if (!files) return false;

    // 単一ファイル置換の場合
    if (replaceIndex !== null && files.length > 1) {
      alert("置換時は1つのファイルのみ選択してください。");
      return false;
    }

    // 最大ファイル数チェック
    if (replaceIndex === null && previewFiles.length >= maxFiles) {
      alert(`ファイルは最大${maxFiles}つまでアップロードできます。`);
      return false;
    }

    if (replaceIndex === null && previewFiles.length + files.length > maxFiles) {
      const remainingSlots = maxFiles - previewFiles.length;
      alert(
        `ファイルは最大${maxFiles}つまでアップロードできます。あと${remainingSlots}つまで追加可能です。`
      );
      return false;
    }

    const validFiles = validateFiles(files);
    if (validFiles.length === 0) return false;

    try {
      const newPreviews = await Promise.all(
        validFiles.map(async (file) => {
          const url = URL.createObjectURL(file);
          urlsRef.current.add(url);
          
          const base64Data = await fileToBase64(file);

          return {
            id: generateId(),
            url,
            type: file.type,
            name: file.name,
            base64Data,
            file,
          };
        })
      );

      if (replaceIndex !== null) {
        setPreviewFiles((prev) => {
          const oldUrl = prev[replaceIndex].url;
          URL.revokeObjectURL(oldUrl);
          urlsRef.current.delete(oldUrl);

          return prev.map((file, i) =>
            i === replaceIndex ? newPreviews[0] : file
          );
        });
      } else {
        setPreviewFiles((prev) => {
          const updated = [...prev, ...newPreviews];
          const limitedUpdated = updated.slice(0, maxFiles);

          setCurrentIndex(limitedUpdated.length - 1);
          return limitedUpdated;
        });
      }

      return true;
    } catch (error) {
      console.error("ファイル処理エラー:", error);
      alert("ファイルの処理中にエラーが発生しました。");
      return false;
    }
  };

  const removeFile = (index: number) => {
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

  const clearFiles = () => {
    urlsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    urlsRef.current.clear();
    setPreviewFiles([]);
    setCurrentIndex(0);
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urlsRef.current.clear();
    };
  }, []);

  return {
    previewFiles,
    currentIndex,
    setCurrentIndex,
    addFiles,
    removeFile,
    clearFiles,
    maxFiles,
    canAddMore: previewFiles.length < maxFiles,
  };
};