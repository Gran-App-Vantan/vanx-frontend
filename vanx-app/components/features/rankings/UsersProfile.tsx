import Image from "next/image";

export interface contentProps {
    rank?: number;
    name?: string;
    image?: string;
    score?: string;
}

export function Number ({rank, name, image, score}: contentProps) {

    let textColor, borderColor, innerColor, textSize, textBold;

    if (rank === 1) {
        textColor = "text-gold";
        borderColor = "border-gold";
        innerColor = "inner-color";
        textSize = "text-[28px]";
        textBold = "font-bold";

    } else if (rank === 2) {
        textColor = "text-silver";
        borderColor = "border-silver";
        innerColor = "inner-color";
        textSize = "text-[24px]";
        textBold = "font-bold";
    } else if (rank === 3) {
        textColor = "text-bronze";
        borderColor = "border-bronze";
        innerColor = "inner-color";
        textSize = "text-[22px]";
        textBold = "font-bold";
    } else if (rank === 4) {
        textColor = "text-blue-dark";
        borderColor = "border-blue-dark";
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 5) {
        textColor = "text-green-light";
        borderColor = "border-green-light";
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 6) {
        textColor = "text-yellow-green-light";
        borderColor = "border-yellow-green-light";
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 7) {
        textColor = "text-blue-light";
        borderColor = "border-blue-light"; 
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 8) {
        textColor = "text-purple-light";
        borderColor = "border-purple-light";    
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 9) {
        textColor = "text-orange-light";
        borderColor = "border-orange-light";    
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else if (rank === 10) {
        textColor = "text-punk-light";
        borderColor = "border-punk-light"; 
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    } else {
        textColor = "text-text-gray";
        borderColor = "border-gray";
        innerColor = "inner-color";
        textSize = "text-[20px]";
        textBold = "font-medium";
    }
    return(
        <div className={`${borderColor} bg-white rounded-lg w-[392px] h-18 mx-auto`}>
            <div className={`${innerColor} flex gap-8 mx-auto justify-start items-center h-17 shadow-bottom`}>
                <div className="ml-12 w-14">
                    <p className={`font-[noto-sans-jp] ${textColor} ${textSize} italic`}>
                        {rank}<span className={`${textColor} text-h3 font-bold`}>st</span>
                    </p>
                </div>
                <div className="flex gap-4 h-[42px] items-center">
                    <Image src={image ?? "/default.png"} alt="user-icon" width={42} height={42} /> {/* デフォルト画像 */}
                    <div className="inline-flex">
                        <div className="flex flex-col items-center justify-center w-45">
                            <p>{name}</p>
                            <p className="text-accent">{score}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}