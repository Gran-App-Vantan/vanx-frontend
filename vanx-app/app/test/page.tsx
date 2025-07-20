"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/features/post";
import { Button } from "@/components/shared";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';



export default function Test() {
    return (
        <div className="pt-6 px-6 bg-accent-light flex flex-col gap-8">
        <div className="flex justify-between">
            <div className="flex gap-6">

            <div className="size-12">
                            <Image
                                src="/icons/user-icon.svg"
                                alt='user-icon'
                                width={50}
                                height={50}
                                className='rounded-full'
                            />
                </div>   
                

                <div className="font-sans ">
                <p className="text-small not-italic font-normal text-text-gray">junpeichan@0310</p>
                <p className=" text-normal font-bold">じゅんぺいちゃん</p>
                </div>

            </div>

            <div>
                <Link  href="/edit" className="flex text-text-gray bg-gray rounded-full py-2 px-4  gap-2">
                    <p>編集</p>
                    <Image
                    src="/icons/user-icon.svg"
                    alt="edit-icon"
                    width={16}
                    height={16}
                    />
                </Link>
            </div>
        </div>


        <div className="flex justify-end gap-6 text-label">
        <p className="pt-2 text-h3">100位</p>
        
        <Link href="/rankings" className="p-2 flex gap-2 bg-accent text-accent-light rounded">
            <p>ランキングを見る</p>
            <Image
            src="/icons/user-icon.svg"
            alt="usert-icon"
            width={24}
            height={24}

            />
        </Link>
        
        </div>

    </div>
        
    )
    }