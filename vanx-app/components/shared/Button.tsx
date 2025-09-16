"use client";
import React from "react";

export interface ButtonProps {
  buttonType: "redButton" | "grayButton" | "arrowButton";
  text?: string;
  size?: "s" | "m" | "l" | "custom";
  className?: string;
}

export function Button({
  buttonType,
  text = "",
  size = "m",
  className = "",
}: ButtonProps) {
  const sizeClass = {
    s: "w-[44px] h-[44px]",
    m: "w-[300px] h-[43px]",
    l: "w-[350px] h-[47px]",
    custom: "",
  }[size];

  if (buttonType === "arrowButton") {
    return (
      <button
        className={`rounded-full bg-accent flex items-center justify-center shadow-md ${sizeClass} ${className}`}
      >
        <div className="w-3 h-3 border-t-2 border-r-2 border-white rotate-45"></div>
      </button>
    );
  }

  const baseButton = {
    redButton: `text-white rounded-3xl bg-accent`,
    grayButton: `text-text-gray rounded-3xl bg-gray`,
  }[buttonType];

  return (
    <button
      className={`
        cursor-pointer
        ${baseButton} ${sizeClass} ${className}
      `}
    >
      {text}
    </button>
  );
}
