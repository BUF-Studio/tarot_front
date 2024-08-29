"use client";

import React, { useContext } from "react";
import styles from "../history.module.scss";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import { toTitleCase } from "../../_utils/text-formatter";
import { HistoryContext } from "@/app/lib/context/history-provider";

export default async function HistoryDetails() {
  const historyContext = useContext(HistoryContext);

  if (historyContext.currentHistories === undefined) {
    return (
      <div className={styles.historyContainer}>
        <h1 className={`title-large ${styles.title}`}>No history found</h1>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <Stack
        maxWidth="md"
        sx={{ width: "100%", mt: 2, mb: 4 }}
        className={styles.header}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
          maxWidth="md"
          sx={{ width: "100%" }}
        >
          <h1 className={`title-large ${styles.title}`}>
            {toTitleCase(historyContext.currentHistories?.question ?? "")}
          </h1>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          maxWidth="md"
          sx={{ width: "100%", mt: 1 }}
          alignItems="baseline"
        >
          <h1 className={`title-medium ${styles.title}`}>
            {new Date(
              historyContext.currentHistories?.session_created ?? ""
            ).toUTCString()}
          </h1>
          <Chip
            label={toTitleCase(historyContext.currentHistories?.stage ?? "")}
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        maxWidth="md"
        sx={{ width: "100%", mt: 1, mb: 4 }}
        alignItems="baseline"
        className={styles.summary}
      >
        <h1 className={`body-large`}>
          {historyContext.currentHistories?.summary ?? ""}
        </h1>
      </Stack>

      <div className={styles.cardContainer} style={{ padding: 0 }}>
        {historyContext.currentHistories?.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

const Card = ({
  card,
}: {
  card: { position: string; description: string };
}) => {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <Image
            src={`/cards/${card.description.split("-")[0].trimEnd()}.jpg`}
            alt={card.description.split("-")[0].trimEnd()}
            fill={true}
            sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
          />
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.flipCardInnerBack}>
            <h1 className={`title-medium`}>{card.position}</h1>
            <p className={`body-medium`}>{card.description.split("-")[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
