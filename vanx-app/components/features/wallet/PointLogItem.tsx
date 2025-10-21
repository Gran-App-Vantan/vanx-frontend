export type PointLogItemProps = {
  serviceName: string;
  pointAmount: number;
  type: "plus" | "minus";
  date: string;
  time: string;
};

export function PointLogItem({
  serviceName, 
  pointAmount,
  type,
  date,
  time,
}: PointLogItemProps) {
  return (
    <div className="flex justify-start items-center gap-4 px-4 py-5 border-b-[0.5px] border-b-text-gray w-full font-medium bg-white text-normal">
      <p className="text-label">{`${date} ${time}`}</p>
      <p className="w-48">{serviceName}</p>
      <p className={`${type === "plus" ? "text-green-letters" : "text-red-letters"}`}>
        {type === "plus" && "+"}{pointAmount}
      </p>
    </div>
  );
}
