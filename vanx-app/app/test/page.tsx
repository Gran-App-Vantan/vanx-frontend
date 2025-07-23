"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/features/post";
import { Button } from "@/components/shared";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { NumberOne, NumberTwo, Number } from "@/components/features/rankings/UsersProfile";



export default function Test() {
    return (
      <div className="flex flex-col gap-4">
        {/* <NumberOne rank={1} name="じゅんPayん" image="/icon.png" score="100,000P" />
        <NumberTwo rank={2} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" /> */}
        <Number rank={1} name="じゅんPayん??" image="/icon.png" score="100,000P" />
        <Number rank={2} name="paypay" image="/icon.png" score="50,000P" />
        <Number rank={3} name="れおれおん" image="/icon.png" score="50,000P" />
        <Number rank={4} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={5} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={6} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={7} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={8} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={9} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={10} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={11} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        <Number rank={12} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
      </div>
    )
    }