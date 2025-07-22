import React from "react";

type EyeVisibleIconProps = {
  className?: string;
  size?: string | number; // オプショナルに
  isClicked: boolean;
};

export function EyeVisibleIcon({ className = "", size = 24, isClicked }: EyeVisibleIconProps) {
  return (
    isClicked ? (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 表示の場合のアイコンSVGパスをここに記述 */}
        <path d="..." />
      </svg>
    ) : (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 非表示の場合のアイコンSVGパスをここに記述 */}
        <path d="..." />
      </svg>
    )
  );
}