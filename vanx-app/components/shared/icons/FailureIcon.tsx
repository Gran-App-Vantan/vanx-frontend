type FailureIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
}

export function FailureIcon({ 
  // デフォルトの値を設定
  className = "",
  size = 54, 
}: FailureIconProps) {
  return (
    <svg 
      className={className}
      width={size}
      height={size} 
      viewBox="0 0 54 54" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M27 4.5C39.4264 4.5 49.5001 14.5736 49.5001 27C49.5001 39.4264 39.4264 49.5 27 49.5C14.5737 49.5 4.50003 39.4264 4.50003 27C4.50003 14.5736 14.5737 4.5 27 4.5ZM27 6.74996C15.8163 6.74996 6.75 15.8163 6.75 27C6.75 38.1838 15.8163 47.25 27 47.25C38.1838 47.25 47.25 38.1838 47.25 27C47.25 15.8163 38.1838 6.74996 27 6.74996ZM35.5449 15.2744L38.7269 18.4564L30.1833 27L38.7269 35.5436L35.5449 38.7256L27.0013 30.1819L18.4736 38.7097L15.2916 35.5277L23.8193 27L15.2916 18.4723L18.4736 15.2903L27.0013 23.818L35.5449 15.2744Z" fill="#D9042B"/>
    </svg>
  );
}