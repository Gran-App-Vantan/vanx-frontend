"use client";

import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/features/post";
import { Button } from "@/components/shared";
import { useState, useEffect, useRef } from "react";


export default function Test() {
  return (
    <>
      <Button
        buttonType="redButton"
        size="l"
        text="登録"
        className="shadow-top"
      />
    </>
  )
}