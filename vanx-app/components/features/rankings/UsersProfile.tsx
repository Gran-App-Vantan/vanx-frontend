import Image from "next/image";

const UsersProfile = [
    {
        style: "bg-white rounded-lg rounded-lg width-[392px] h-14"
    }
]
export interface contentProps {
    rank?: string;
    name?: string;
    image?: string;
    score?: string;
}


export function NumberOne({rank, name, image, score}: contentProps) {
    return(
        <div className={`${UsersProfile[0].style} border-gold`}>
            <div className="inner-gold flex gap-12 mx-auto justify-center items-center h-13 shadow-bottom">
                <div className="mx-6">
                    <p className="font-[noto-sans-jp] text-gold text-[26px] font-bold">
                        {rank}
                    </p>
                </div>
                <div className="flex gap-4 h-[42px] items-center">
                    <Image src={image ?? "/default.png"} alt="user-icon" width={42} height={42} /> {/* デフォルト画像 */}
                    <div className="inline-flex">
                        <div className="flex flex-col items-center justify-center">
                            <p>{name}</p>
                            <p className="text-accent">{score}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}