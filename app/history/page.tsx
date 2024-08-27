import React from "react";
import styles from "./history.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { toTitleCase } from "@/app/_utils/text-formatter";
import { Session } from "./session-interface";
import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { NextServer } from "@aws-amplify/adapter-nextjs";
import { redirect } from "next/navigation";
import { handleGetCurrentUser } from "../lib/aws/cognito";

export default async function History() {
  const user = await handleGetCurrentUser();
  console.log("User Id " , user);

  if (!user) {
    redirect("/signin");
  }
  const userId = user.userId;

  // const res = await fetch(
  //   `http://${process.env.BACKEND_URL}/userSessions?user_id=${userId}`,
  //   {
  //     method: "GET",
  //     cache: "force-cache",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }
  // );

  const session: Session[] = [];

  if (!session || session.length === 0) {
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
          <p className="body-large" style={{ textAlign: "center" }}>
            No history yet...
          </p>
        </Container>
      </div>
    );
  }

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
        {session.map((session: Session) => (
          <HistoryCard key={session.id} session={session} />
        ))}
      </Container>
    </div>
  );
}

const HistoryCard = ({ session }: { session: Session }) => {
  return (
    <Link
      href={`/history/${session.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box className={styles.sessionContainer}>
        <Stack direction="row" alignItems="center">
          <Image
            src="/logo.png"
            alt="Current Card"
            width={64}
            height={64}
            className={styles.logo}
            style={{ width: "auto", height: "100%", margin: 0 }}
          />
          <Container style={{ paddingRight: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h1 className={`title-large`}>{toTitleCase(session.question)}</h1>
              <p className={`label-large ${styles.subtitle}`}>
                {toTitleCase(session.stage)}
              </p>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={0.5}
            >
              <p className={`body-large ${styles.ellipsisText}`}>
                {session.summary}
              </p>
            </Stack>
          </Container>
        </Stack>
      </Box>
    </Link>
  );
};
