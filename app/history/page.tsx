import React from "react";
import styles from "./history.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import HistoryList from "./components/history-list";

export default async function History() {
  return (
    <div className={styles.historyContainer}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="md"
        sx={{ width: "100%", my: 2, pr: { xs: 2 } }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={64}
          height={64}
          className={styles.logo}
        />
        <Link href={"/"}>
          <IconButton aria-label="Go to home" edge="end">
            <CloseRoundedIcon />
          </IconButton>
        </Link>
      </Stack>
      <Container maxWidth="sm">
        <TextField
          fullWidth
          id="search"
          label="Search History"
          name="search"
          autoComplete="search"
        />
        <Divider sx={{ my: 2 }} />
        <HistoryList />
      </Container>
    </div>
  );
}
