type EditIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
}

export function EditIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 16, 
}: EditIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.33333 14H14.3333" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.66667 8.90667V11.3333H6.10567L13 4.436L10.565 2L3.66667 8.90667Z" stroke="#9A9A9A" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}