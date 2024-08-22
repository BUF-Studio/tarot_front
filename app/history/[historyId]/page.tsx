import React from "react";
import styles from "../history.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { toTitleCase } from "../../_utils/text-formatter";
import { Session } from "../session-interface";

export default function HistoryDetails() {

  // query the session to frontend from repository
  const currentSession: Session = {
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
      { position: "Outcome", description: "Card Name - Detailed Description" },
      { position: "Advice", description: "Card Name - Detailed Description" },
    ],
    summary: "Summary of the reading that links to the question",
    current_card: 3,
    session_created: new Date(),
  };

  return (
    <div className={styles.historyContainer}>

      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="md"
      >
        {cards.}
        <Image
          src="/logo.png"
          alt="Logo"
          width={64}
          height={64}
          className={styles.logo}
        />
        
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
      </Container>
    </div>
  );
}

const card = {};
