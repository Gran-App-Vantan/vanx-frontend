"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/features/post";
import { Button } from "@/components/shared";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';

import { PointLogItem } from "@/components/features/point-detail/PointLogItem";



export default function Test() {
  return (
    <div>
        <PointLogItem isPulse={true} />
    </div>
    )
    }