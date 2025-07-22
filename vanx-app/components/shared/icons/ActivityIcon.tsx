type ActivityIconProps = {
  className: string;
  size: string | number; // 文字列と数字どちらでも受け取れるように
}

export function ActivityIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 24, 
}: ActivityIconProps) {
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