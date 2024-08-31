"use client";

import React, { useContext } from "react";
import Box from "@mui/material/Box";
import styles from "../history.module.scss";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import { toTitleCase } from "@/app/_utils/text-formatter";
import { Session } from "../session-interface";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/navigation";
import { HistoryContext } from "@/app/lib/context/history-provider";

const HistoryCard = ({ session }: { session: Session }) => {
  const router = useRouter();
  const historyContext = useContext(HistoryContext);

  return (
    <ButtonBase
      sx={{ mb: 1, borderRadius: 4 }}
      onClick={() => {
        historyContext.updateCurrentHistories(session);
        router.push(`/profile/history/${session.session_id}`);
      }}
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
              <h1 className={`title-large`} style={{ textAlign: "left" }}>
                {toTitleCase(session.question)}
              </h1>
              <p className={`label-large ${styles.subtitle}`}>
                {toTitleCase(session.stage)}
              </p>
            </Stack>
            <Box mt={0.5}>
              <p className={`body-large ${styles.ellipsisText}`}>
                {session.summary}
              </p>
            </Box>
          </Container>
        </Stack>
      </Box>
    </ButtonBase>
  );
};

export default HistoryCard;
