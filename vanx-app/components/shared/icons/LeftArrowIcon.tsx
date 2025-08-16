type LeftArrowIconPrps = {
  className: string;
  size: string | number; // 文字列と数字どちらでも受け取れるように
  color: "black" | "white";
}

export function LeftArrowIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 24, 
  color
}: LeftArrowIconPrps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
          <path
    style={{
      stroke: color === "black" ? "var(--color-text)" : "var(--color-white)"
    }}
   />
      {/* pathは長いので省略 */}
    </svg>
  );
}