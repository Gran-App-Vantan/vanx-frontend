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
        <div className="flex justify-center items-center gap-4 px-2 py-5 border-b-[0.5px] border-b-text-gray w-[408px] font-medium bg-white text-normal"> 
            <p className="text-label">{time}</p>
            <p>{boothName}</p>
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