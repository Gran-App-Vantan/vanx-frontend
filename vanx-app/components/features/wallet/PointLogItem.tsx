export type PointLogItemProps = {
    time: string;
    boothName: string;
    point: number;
    isPuls: boolean;
}

export  function PointLogItem({isPulse}: {isPulse: boolean}) {
    return (
        <div className="flex justify-center items-center gap-4 px-2 py-5 border-b-[0.5px] border-b-text-gray w-[408px] font-medium bg-white text-normal"> 
            <p className="text-label">6/5 10:01</p>
            <p>インディアンポーカー</p>
            <p className={`${isPulse ? "text-green-letters" : "text-red-letters"}`}>{isPulse ?"+":"-"}8000</p>
        </div>
    )
}