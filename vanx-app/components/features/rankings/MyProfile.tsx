import Image from "next/image";
import { useState, useEffect } from "react";

export interface MyProfileProps {
    myImage?: string;
    myName?: string;
    myRank?: number;
}

export function MyProfile({ myImage, myName, myRank }: MyProfileProps) {
    const [isScrolled, setIsScrolled] = useState(false); // スクロールしたかどうかの状態を管理

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // スクロール量を取得
            setIsScrolled(scrollTop > 100); // 100px以上スクロールしたらスタイル変更
        };

        window.addEventListener('scroll', handleScroll);  // スクロールイベントを追加
        return () => window.removeEventListener('scroll', handleScroll);  // スクロールイベントを削除
    }, []);

    return (
        <div className={`flex items-center justify-center bg-accent-light w-full z-10 shadow-bottom scr transition-all duration-300 ${
            isScrolled ? 'flex-row gap-4 h-20' : 'flex-col h-34'
        }`}>
            <div className="flex items-center gap-2">
                {myImage && <Image src={myImage} alt="myImage" width={48} height={48} />}
                <p className="text-text-color text-text-normal">{myName}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-text-color text-h1">{myRank}<span>位</span></p>
            </div>
        </div>  
    )
}