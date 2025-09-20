type PointIconProps = {
  className?: string;
  size?: string | number; // 文字列と数字どちらでも受け取れるように
};

export function PointIcon({
  // デフォルトの値を設定
  className = "",
  size = 30,
}: PointIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_355_1528)">
        <path
          d="M15 28.4375C22.4213 28.4375 28.4375 22.4213 28.4375 15C28.4375 7.57867 22.4213 1.5625 15 1.5625C7.57867 1.5625 1.5625 7.57867 1.5625 15C1.5625 22.4213 7.57867 28.4375 15 28.4375Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 24.0625C20.0051 24.0625 24.0625 20.0051 24.0625 15C24.0625 9.99492 20.0051 5.9375 15 5.9375C9.99492 5.9375 5.9375 9.99492 5.9375 15C5.9375 20.0051 9.99492 24.0625 15 24.0625Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9.41589C18.084 9.41589 20.5841 11.916 20.5841 15"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 28.4375C22.4213 28.4375 28.4375 22.4213 28.4375 15C28.4375 7.57867 22.4213 1.5625 15 1.5625C7.57867 1.5625 1.5625 7.57867 1.5625 15C1.5625 22.4213 7.57867 28.4375 15 28.4375Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 24.0625C20.0051 24.0625 24.0625 20.0051 24.0625 15C24.0625 9.99492 20.0051 5.9375 15 5.9375C9.99492 5.9375 5.9375 9.99492 5.9375 15C5.9375 20.0051 9.99492 24.0625 15 24.0625Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9.41589C18.084 9.41589 20.5841 11.916 20.5841 15"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_355_1528">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
