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

export default function History() {
  const session: Session[] = [
    {
      id: "1",
      question: "What is the meaning of life?",
      stage: "completed",
      cards: [
        { position: "You", description: "Card Name - Detailed Description" },
        {
          position: "Situation / Context",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Challenge",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Development",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Outcome",
          description: "Card Name - Detailed Description",
        },
        { position: "Advice", description: "Card Name - Detailed Description" },
      ],
      summary: "Summary of the reading that links to the question",
      current_card: 3,
      session_created: new Date(),
    },
    {
      id: "2",
      question: "Will I find true love?",
      stage: "in progress",
      cards: [
        { position: "You", description: "Card Name - Detailed Description" },
        {
          position: "Situation / Context",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Challenge",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Development",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Outcome",
          description: "Card Name - Detailed Description",
        },
        { position: "Advice", description: "Card Name - Detailed Description" },
      ],
      summary: "Summary of the reading that links to the question",
      current_card: 2,
      session_created: new Date(),
    },
    {
      id: "3",
      question: "Should I change my career?",
      stage: "in progress",
      cards: [
        { position: "You", description: "Card Name - Detailed Description" },
        {
          position: "Situation / Context",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Challenge",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Development",
          description: "Card Name - Detailed Description",
        },
        {
          position: "Outcome",
          description: "Card Name - Detailed Description",
        },
        { position: "Advice", description: "Card Name - Detailed Description" },
      ],
      summary: "Summary of the reading that links to the question",
      current_card: 0,
      session_created: new Date(),
    },
  ];

  return (
    <div className={styles.historyContainer}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="md"
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
        {session.map((session) => (
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
              <h1 className={`title-large`}>{session.question}</h1>
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
              <p className={`body-large`}>{session.summary}</p>
            </Stack>
          </Container>
        </Stack>
      </Box>
    </Link>
  );
};
