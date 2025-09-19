"use client";
import { useRef } from "react";

export type ModalProps = {
  size: "normal" | "large" | "rule-book";
  openModal: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ size, openModal, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const OutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!openModal) return null;

  return (
    <div
      className="bg-[#9A9A9A]/50 fixed inset-0 z-40 flex justify-center items-center"
      onClick={OutClick}
    >
      <dialog
        className={`
          flex items-center justify-center bg-white rounded-2xl m-auto p-4
          ${
            size === "normal"
              ? "w-[350px] h-[200px]"
              : size === "large"
                ? "w-[350px] h-[250px]"
                : "w-[350px] h-[620px]"
          }
        `}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
