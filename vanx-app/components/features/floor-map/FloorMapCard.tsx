import Image from "next/image";

type Props = {
    boothName: string;
    boothText: string;
    gradeFaculty: string;
    boothImageText: string;
    bgImg: string; 
    altText: string;
}

export function FloorMapCard({ boothName, boothText, gradeFaculty, boothImageText, bgImg,altText }: Props) {
    return(
        <div className="relative p-4 overflow-hidden rounded-lg bg-accent-light w-[350px] h-[279px] m-auto shadow-bottom">
            <div className="absolute top-0 left-0 flex w-full items-end justify-between pr-4">
                <p className="text-white bg-accent w-1/2 text-center py-2 text-xl rounded-br-full">{boothName}</p>
                <div className="w-32 py-1 text-center text-xs bg-base border border-text h-fit rounded-full">{gradeFaculty}</div>
            </div>
            <div className="flex justify-between w-full pt-12">
                <p className="py-4 overflow-y-auto text-xs whitespace-pre-wrap">{boothText}</p>

                <div className="relative w-[150px] h-[180px]">
                    <Image
                        className="rounded-lg object-cover"
                        src={bgImg}
                        alt={altText}
                        fill
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-white px-4 py-2 rounded-lg text-xs shadow-bottom">{boothImageText}</div>
                </div>
            </div>
        </div>  
    )
}
