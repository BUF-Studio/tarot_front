"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <IconButton
      aria-label="Go to home"
      edge="end"
      onClick={() => router.back()}
    >
      <CloseRoundedIcon />
    </IconButton>
  );
}
