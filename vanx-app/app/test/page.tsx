"use client"

import { useState } from "react"
import { ActivityIcon, ClockIcon, CloseIcon, DeleteIcon, EditIcon, EmojiIcon, EyeVisibleIcon, FailureIcon, FloorMapIcon, FoodIcon, HomeIcon, LargeCheckIcon, LeftArrowIcon, LessThanIcon, LoadingIcon, NatureIcon, NormalCheckIcon, PointIcon, ProfileIcon, PulsIcon, ReactionAddIcon, SearchIcon, SymbolsIcon, TravelIcon } from "@/components/shared/icons"

export default function Test() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main className="flex flex-col gap-2">
      <ActivityIcon />
      <ClockIcon />

      <div className="bg-text-gray p-1">
        <CloseIcon />
      </div>

      <DeleteIcon />
      <EditIcon />
      <EmojiIcon />
      <EyeVisibleIcon 
        isClicked={isClicked} 
        onClick={() => setIsClicked(!isClicked)} 
      />
      <FailureIcon />
      <FloorMapIcon />
      <FoodIcon />
      <HomeIcon />
      <LargeCheckIcon />
      <LeftArrowIcon color="black" />

      <div className="bg-text-gray p-1">
        <LeftArrowIcon color="white" />
      </div>

      <div className="bg-text-gray p-1">
        <LessThanIcon />
      </div>

      <LoadingIcon />
      <NatureIcon />
      <NormalCheckIcon />
      <PointIcon />
      <ProfileIcon />

      <div className="bg-text-gray p-1">
        <PulsIcon />
      </div>

      <ReactionAddIcon />
      <SearchIcon />
      <SymbolsIcon />
      <TravelIcon />
    </main>
  )
}