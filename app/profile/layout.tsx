import React from "react";
import styles from "./profile.module.scss";
import Image from "next/image";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import BackButton from "../components/back-button";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box display="flex" flexDirection="column" p={1} alignItems="center">
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="md"
        sx={{ width: "100%", my: 2, pr: { xs: 2 } }}
      >
        <Image src="/logo.png" alt="Logo" width={64} height={64} />
        <BackButton />
      </Stack>
      {children}
    </Box>
  );
}
