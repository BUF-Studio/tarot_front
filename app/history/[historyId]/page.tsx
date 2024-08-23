import React from "react";
import styles from "../history.module.scss";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import { toTitleCase } from "../../_utils/text-formatter";
import { Session } from "../session-interface";
export default function HistoryDetails() {
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
            {currentSession.question}
          </h1>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          maxWidth="md"
          sx={{ width: "100%", mt: 1 }}
          alignItems="baseline"
        >
          <h1 className={`body-large ${styles.title}`}>
            {currentSession.session_created.toUTCString()}
          </h1>
          <Chip label={toTitleCase(currentSession.stage)} />
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
        <h1 className={`headline-medium`} style={{ fontWeight: "bold" }}>
          {currentSession.summary}
        </h1>
      </Stack>
      <div className={styles.cardContainer} style={{ padding: 0 }}>
        {currentSession.cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            isCurrentCard={index == currentSession.current_card}
          />
        ))}
      </div>
    </div>
  );
}

const Card = ({
  card,
  isCurrentCard,
}: {
  card: { position: string; description: string };
  isCurrentCard: boolean;
}) => {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <Image src="/logo-188-272.png" alt="Card" width={188} height={272} />
        </div>
        <div className={styles.flipCardBack}>
          <div
            className={`${styles.flipCardInnerBack} ${
              isCurrentCard ? styles.currentCard : styles.notCurrentCard
            }`}
          >
            <h1 className={`title-medium`}>{card.position}</h1>
            <p className={`body-medium`}>{card.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
