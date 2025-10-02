import Image from "next/image";

type InputProps = {
  id: string;
  size: "small" | "normal";
  type: "text" | "password";
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  isPasswordVisible?: boolean;
  readonly?: boolean;
  error?:
    | "必須項目です"
    | "ユーザー名とパスワードが一致しません"
    | "パスワードが一致しません"
    | "名前は既に使用されています";
};

export function Input({
  id,
  size,
  type,
  value = "",
  placeholder,
  onChange,
  onClick,
  isPasswordVisible,
  readonly = false,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col text-label">
      {error && <span className="mx-3.5 mb-2 text-red-letters">{error}</span>}

      <div
        className={`
        ${size === "normal" ? "w-[350px]" : "w-[300px]"}
        ${error ? "border-red-letters border-2" : "border-text-gray border"}
        flex px-4 gap-4 bg-white rounded-lg text-text
      `}
      >
        <input
          id={id}
          className="w-full h-full outline-none py-3.5"
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          readOnly={readonly}
        />
        {type === "password" && value.length > 0 && (
          <Image
            src={`${
              isPasswordVisible
                ? "/icons/eye-display-icon.svg"
                : "/icons/eye-hidden-icon.svg"
            }`}
            className="cursor-pointer"
            alt="eye-icon"
            width={24}
            height={24}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
}
