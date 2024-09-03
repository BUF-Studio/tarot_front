"use client";

import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/navigation";
import { handleSignOut } from "../../lib/aws/cognito";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await handleSignOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ButtonBase
      onClick={handleLogout}
      sx={{
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        p: 2,
      }}
    >
      <Typography className="body-large">Log Out</Typography>
      <ArrowOutwardRoundedIcon />
    </ButtonBase>
  );
}
