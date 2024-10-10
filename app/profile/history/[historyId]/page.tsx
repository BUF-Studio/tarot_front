import React from "react";
import styles from "../history.module.scss";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import { toTitleCase } from "../../../_utils/text-formatter";

export default async function HistoryDetails({
  params,
}: {
  params: { historyId: string };
}) {
  const id = params.historyId;

  const response = await fetch(
    `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/userSessions/${id}`
  );

  if (!response.ok) {
    console.log("Response error:", response);
    return (
      <p className="body-large" style={{ textAlign: "center" }}>
        Failed to load
      </p>
    );
  }

  const historyData = await response.json();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack
        maxWidth="md"
        sx={{ width: "96%", mt: 2, mb: 4 }}
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
            {toTitleCase(historyData.question ?? "")}
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
            {new Date(historyData.session_created ?? "").toUTCString()}
          </h1>
          <Chip label={toTitleCase(historyData.stage ?? "")} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        maxWidth="md"
        sx={{ width: "96%", mt: 1, mb: 4 }}
        alignItems="baseline"
        className={styles.summary}
      >
        <h1 className={`body-large`}>{historyData.summary ?? ""}</h1>
      </Stack>

      <div className={styles.cardContainer} style={{ padding: 0 }}>
        {historyData.cards.map(
          (card: { position: string; description: string }, index: number) => (
            <Card key={index} card={card} />
          )
        )}
      </div>
    </Box>
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
            width={188}
            height={272}
          />
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.flipCardInnerBack}>
            <h1 className={`title-small`}>{card.position}</h1>
            <p className={`body-small`}>{card.description.split("-")[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
