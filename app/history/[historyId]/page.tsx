"use client";

import React from "react";
import styles from "../history.module.scss";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import { toTitleCase } from "../../_utils/text-formatter";
import { Session } from "../session-interface";
import { motion, useMotionValue, useSpring } from "framer-motion";
const currentSession: Session = {
  id: "1",
  question: "What is the meaning of life?",
  stage: "completed",
  cards: [
    {
      position: "You",
      description:
        "Nine of Pentacles - This card signifies independence, abundance, and self-sufficiency. You are feeling confident and secure in your abilities going into the exam.",
    },
    {
      position: "Situation / Context",
      description:
        "The Tower - This card represents sudden change, upheaval, and chaos. The situation surrounding your exam may be unpredictable and challenging.",
    },
    {
      position: "Challenge",
      description:
        "Five of Cups - This card signifies regret, loss, and dwelling on the past. Your challenge lies in overcoming any negative emotions or setbacks that may hinder your performance.",
    },
    {
      position: "Development",
      description:
        "The Magician - This card symbolizes manifestation, creativity, and willpower. You are in a phase of growth and development, honing your skills and knowledge for the exam.",
    },
    {
      position: "Outcome",
      description:
        "Ace of Swords - This card represents clarity, truth, and breakthroughs. The outcome of your exam is likely to be positive, with new insights and achievements.",
    },
    {
      position: "Advice",
      description:
        "The High Priestess - This card signifies intuition, inner wisdom, and mystery. Trust your inner voice and intuition during the exam, listen to your instincts and stay focused on your goals.",
    },
  ],
  summary: "Summary of the reading that links to the question",
  current_card: 3,
  session_created: new Date(),
};

export default function HistoryDetails() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xBackMotion = useSpring(x, { stiffness: 1000, damping: 100 });
  const yBackMotion = useSpring(y, { stiffness: 1000, damping: 100 });

  const handleGridParallax = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    //disable on mobile
    if (window.innerWidth < 768) {
      return;
    }
    if (gridRef.current) {
      const speed = -10;
      const { width, height } = gridRef.current.getBoundingClientRect();
      const offsetX = event.pageX - width * 0.5;
      const offsetY = event.pageY - height * 0.5;

      const newTransformX = (-offsetX * speed) / 200;
      const newTransformY = (-offsetY * speed) / 200;

      x.set(newTransformX);
      y.set(newTransformY);
    }
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
      {/* <motion.div
        onMouseMove={handleGridParallax}
        ref={gridRef}
        transition={{
          duration: 1.25,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        style={{
          x: xBackMotion,
          y: yBackMotion,
        }}
      > */}
      <div className={styles.cardContainer} style={{ padding: 0 }}>
        {currentSession.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      {/* </motion.div> */}
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
