type CheckIconProps = {
  className: string;
  size: string | number; // 文字列と数字どちらでも受け取れるように
}

export function CheckIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 64, 
}: CheckIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* pathは長いので省略 */}
    </svg>
  );
}