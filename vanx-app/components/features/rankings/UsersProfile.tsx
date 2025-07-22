import Image from "next/image";

const UsersProfile = [
    {
        style: "bg-white rounded-lg rounded-lg width-[392px] h-14"
    }
]
export interface contentProps {
    rank?: number;
    name?: string;
    image?: string;
    score?: string;
}


export function NumberOne({rank, name, image, score}: contentProps) {
    return(
        <div className={`${UsersProfile[0].style} border-gold`}>
            <div className="inner-gold flex gap-8 mx-auto justify-start items-center h-13 shadow-bottom">
                <div className="ml-12 w-14">
                    <p className="font-[noto-sans-jp] text-gold text-[28px] font-bold italic">
                        {rank}<span className="text-gold text-h3 font-bold">st</span>
                    </p>
                </div>
                <div className="flex gap-4 h-[42px] items-center ">
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
export function NumberTwo({rank, name, image, score}: contentProps) {
    return(
    <div className={`${UsersProfile[0].style} border-silver`}>
        <div className="inner-gold flex gap-8 mx-auto justify-start items-center h-13 shadow-bottom">
            <div className="ml-12 w-14">
                <p className="font-[noto-sans-jp] text-silver text-[24px] font-bold italic">
                    {rank}<span className="text-silver text-h3 font-bold">nd</span>
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
