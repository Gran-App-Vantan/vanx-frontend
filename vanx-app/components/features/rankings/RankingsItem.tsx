import Image from "next/image";

type RankingsItemProps = {
  rank: number;
  name: string;
  icon: string;
  score: number;
};

const RankingsItemStyles = {
  "1st": {
    textColor: "text-gold",
    borderColor: "border-gold",
    innerColor: "inner-color",
    textSize: "text-[28px]",
  },
  "2nd": {
    textColor: "text-silver",
    borderColor: "border-silver",
    innerColor: "inner-color",
    textSize: "text-[24px]",
  },
  "3rd": {
    textColor: "text-bronze",
    borderColor: "border-bronze",
    innerColor: "inner-color",
    textSize: "text-[22px]",
  },
  "4th": {
    textColor: "text-blue-dark",
    borderColor: "border-blue-dark",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "5th": {
    textColor: "text-green-light",
    borderColor: "border-green-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "6th": {
    textColor: "text-yellow-green-light",
    borderColor: "border-yellow-green-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "7th": {
    textColor: "text-blue-light",
    borderColor: "border-blue-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "8th": {
    textColor: "text-purple-light",
    borderColor: "border-purple-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "9th": {
    textColor: "text-orange-light",
    borderColor: "border-orange-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "10th": {
    textColor: "text-punk-light",
    borderColor: "border-punk-light",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  },
  "default": {
    textColor: "text-text-gray",
    borderColor: "border-gray",
    innerColor: "inner-color",
    textSize: "text-[20px]",
  }
}

export function RankingsItem({ 
  rank, 
  name, 
  icon, 
  score 
}: RankingsItemProps) {
  function getRankKey(rank: number): keyof typeof RankingsItemStyles {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    if (rank >= 4 && rank <= 10) return `${rank}th` as keyof typeof RankingsItemStyles;
    return "default";
  }

  const rankKey = getRankKey(rank);
  const { textColor, borderColor, innerColor, textSize, } = RankingsItemStyles[rankKey];

  return (
    <div
      className={`${borderColor} bg-white rounded-lg w-[392px] h-18 mx-auto`}
    >
      <div
        className={`${innerColor} flex gap-8 mx-auto justify-start items-center h-17 shadow-bottom`}
      >
        <div className="ml-12 w-14">
          <p className={`font-[noto-sans-jp] ${textColor} ${textSize} italic`}>
            {rank}
            <span className={`${textColor} text-h3 font-bold`}>st</span>
          </p>
        </div>
        <div className="flex gap-4 h-[42px] items-center">
          <Image
            src={icon ?? "/default.png"}
            alt="user-icon"
            width={42}
            height={42}
          />
          {/* デフォルト画像 */}
          <div className="inline-flex">
            <div className="flex flex-col items-center justify-center w-45">
              <p>{name}</p>
              <p className="text-accent">{score}P</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
