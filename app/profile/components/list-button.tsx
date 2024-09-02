"use client"

import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Typography from "@mui/material/Typography";

interface ListButtonProps {
  title: string;
  onClick?: () => void; 
}

export default function ListButton({ title, onClick }: ListButtonProps) {
  return (
    <ButtonBase
      onClick={onClick} 
      sx={{
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 1,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default", 
        p: 2,
      }}
    >
      <Typography className="body-large">{title}</Typography>
      <ArrowOutwardRoundedIcon />
    </ButtonBase>
  );
}