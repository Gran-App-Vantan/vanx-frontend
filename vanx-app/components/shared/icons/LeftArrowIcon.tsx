type LeftArrowIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
  color: "black" | "white";
}

export function LeftArrowIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 24, 
  color
}: LeftArrowIconProps) {
  return (
    <svg 
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={color === "black" ? "#1A1A1A" : "#FFFFFF"}
        d="M9.53125 15.625L3.90625 10L9.53125 4.375M4.6875 10H16.0938" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}