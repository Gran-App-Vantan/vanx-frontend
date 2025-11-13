type EyeVisibleIconProps = {
  className?: string;
  size?: string | number; // オプショナルに
  isClicked: boolean;
  onClick: () => void;
};

export function EyeVisibleIcon({
  className = "",
  size = 24,
  isClicked,
  onClick,
}: EyeVisibleIconProps) {
  return isClicked ? (
    <svg
      className={`cursor-pointer ${className}`}
      width={size}
      height={size}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.818 19 4.236 14.987 2.743 13.038C2.51205 12.7413 2.38666 12.376 2.38666 12C2.38666 11.624 2.51205 11.2587 2.743 10.962C4.236 9.013 7.818 5 12 5C16.182 5 19.764 9.013 21.257 10.962Z"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className={`cursor-pointer ${className}`}
      width={size}
      height={size}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.48673 17.129C4.64173 15.819 3.18173 14.115 2.35673 13.039C2.12554 12.7422 2 12.3767 2 12.0005C2 11.6243 2.12554 11.2588 2.35673 10.962C3.84973 9.013 7.43173 5 11.6137 5C13.4897 5 15.2437 5.807 16.7437 6.874"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7437 9.887C13.466 9.60467 13.1351 9.38011 12.7702 9.22629C12.4053 9.07246 12.0135 8.99241 11.6175 8.99075C11.2215 8.98909 10.8291 9.06586 10.4629 9.21662C10.0967 9.36738 9.76393 9.58916 9.48387 9.86915C9.2038 10.1492 8.98195 10.4818 8.8311 10.848C8.68025 11.2142 8.60339 11.6066 8.60496 12.0026C8.60653 12.3986 8.68648 12.7904 8.84022 13.1554C8.99396 13.5203 9.21844 13.8512 9.50071 14.129M3.61371 20L19.6137 4M9.61371 18.704C10.2628 18.8976 10.9363 18.9972 11.6137 19C15.7957 19 19.3777 14.987 20.8707 13.038C21.1013 12.7407 21.2264 12.3751 21.2263 11.9988C21.2261 11.6226 21.1006 11.2571 20.8697 10.96C20.3449 10.2756 19.782 9.6212 19.1837 9"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
