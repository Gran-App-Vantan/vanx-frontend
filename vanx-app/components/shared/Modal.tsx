"use client";
import { useRef, useEffect, useState } from "react";

export type ModalProps = {
  size: "normal" | "large" | "rule-book";
  openModal: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

export function Modal({ 
  size, 
  openModal, 
  children,
  isOpen,
  onClose
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(openModal);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (openModal) {
      setVisible(true);
      setAnimClass("opacity-0");

      requestAnimationFrame(() => {
        setAnimClass("opacity-100");
      });
    } else {
      setAnimClass("opacity-0");

      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [openModal]);

  const OutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex justify-center items-center
        transition-all duration-300 ease-out
        ${animClass === "opacity-100" ? "bg-[#9A9A9A]/50" : "bg-[#9A9A9A]/0"}
      `}
      onClick={OutClick}
    >
      <dialog
        className={`
          flex items-center justify-center bg-white rounded-2xl m-auto
          transition-all duration-300 ease-out transform
          ${animClass}
          ${animClass === "opacity-100" ? "scale-100" : "scale-95"}
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