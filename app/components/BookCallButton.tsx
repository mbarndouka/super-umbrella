"use client";
import React from "react";
import PillButton from "./PillButton";

interface BookCallButtonProps {
  href?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

const BookCallButton = ({
  href = "#contact",
  size = "medium",
  onClick,
  className = "",
}: BookCallButtonProps) => {
  return (
    <PillButton href={href} size={size} onClick={onClick} className={className}>
      Book a Call
    </PillButton>
  );
};

export default BookCallButton;
