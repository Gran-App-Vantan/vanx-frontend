type LoadingIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
}

export function LoadingIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 64, 
}: LoadingIconProps) {
  return (
    <svg 
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 8C45.2533 8 56 18.7467 56 32" stroke="#D9042B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}