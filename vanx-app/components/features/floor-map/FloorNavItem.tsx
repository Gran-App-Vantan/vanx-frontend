type FloorNavItemProps = {
  floors: string[];
  isActive: string | null;
  onClick: (floor: string) => void;
};

const floorsDefault = [
  "w-17",
  "h-8",
  "bg-accent-light",
  "text",
  "font-normal",
  "shadow-bottom",
  "text-center",
  "rounded",
  "my-8",
];

const floorsActive = [
  "w-17",
  "h-8",
  "bg-accent",
  "text-white",
  "font-normal",
  "shadow-bottom",
  "text-center",
  "src-[map-detail-image.png]",
  "rounded",
  "my-8",
];

export function FloorNavItem({
  floors,
  isActive,
  onClick: handleClick,
}: FloorNavItemProps) {
  return (
    <div className="flex justify-center fixed bottom-0 left-1/2 -translate-x-1/2  bg-white  shadow-top w-full">
      <div className="flex gap-2">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => handleClick(floor)}
            className={`${
              isActive === floor
                ? floorsActive.join(" ")
                : floorsDefault.join(" ")
            }`}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
}
