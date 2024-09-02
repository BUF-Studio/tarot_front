import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import BackButton from "../components/back-button";
import Logo from "../components/logo";

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
        <Logo />
        <BackButton />
      </Stack>
      {children}
    </Box>
  );
}
