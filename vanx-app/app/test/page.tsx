"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  PostingButton,
  PostItem,
  ReactionAddButton,
  ReactionBottomSheet,
  Reaction,
} from "@/components/features/post";
import { PointLogItem } from "@/components/features/wallet/PointLogItem";
import { Button, Input } from "@/components/shared";
import { TravelIcon } from "@/components/shared/icons";

export default function Test() {
  return (
    <main>
      <Reaction>
        <TravelIcon />
      </Reaction>
    </main>
  );
}
