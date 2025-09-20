export function Reaction({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-[50px] h-[30px] bg-gray rounded-full cursor-pointer">
      {children}
    </div>
  );
}
