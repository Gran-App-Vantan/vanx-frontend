export type PointLogItemProps = {
    time: string;
    boothName: string;
    point: number;
    isPuls: boolean;
}

export function PointLogItem({
    time,
    boothName,
    point,
    isPuls
}: PointLogItemProps) {
    return (
        <div className="flex justify-start items-center gap-4 px-4 py-5 border-b-[0.5px] border-b-text-gray w-full font-medium bg-white text-normal"> 
            <p className="text-label">{time}</p>
            <p className="w-48">{boothName}</p>
            <p className={`
                ${isPuls 
                    ? "text-green-letters" 
                    : "text-red-letters"
                }
            `}>
                {isPuls ? "+" : "-"} {point}
            </p>
        </div>
    )
}
