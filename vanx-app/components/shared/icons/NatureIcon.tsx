type NatureIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
};

export function NatureIcon({
  // デフォルトの値を設定
  className = "",
  size = 24,
}: NatureIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 21C5.5 16.5 7.5 13 12 11"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99999 18C15.218 18 19.5 14.712 20 6V4H15.986C6.98599 4 3.99999 8 3.98599 13C3.98599 14 3.98599 16 5.98599 18H8.98599H8.99999Z"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
