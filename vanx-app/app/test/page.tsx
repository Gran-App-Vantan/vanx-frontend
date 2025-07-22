"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/features/post";
import { Button } from "@/components/shared";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { NumberOne, NumberTwo } from "@/components/features/rankings/UsersProfile";



export default function Test() {
    return (
      <div className="flex flex-col gap-4">
        <NumberOne rank={1} name="じゅんPayん" image="/icon.png" score="100,000P" />
        <NumberTwo rank={2} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
      </div>
    )
    }