import React from "react";
import Box from "@mui/material/Box";
import styles from "../history.module.scss";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Link from "next/link";
import ButtonBase from "@mui/material/ButtonBase";
import Logo from "@/public/logo.png";
import Image from "next/image";

import { toTitleCase } from "@/app/_utils/text-formatter";
import { Session } from "@/app/lib/definition";

const HistoryCard = ({ session }: { session: Session }) => {
  return (
    <Link
      href={`/profile/history/${session.session_id}`}
      legacyBehavior
      passHref
    >
      <ButtonBase sx={{ mb: 2, borderRadius: 4 }}>
        <Box className={styles.sessionContainer}>
          <Stack direction="row" alignItems="center">
            <Image src={Logo} alt="logo" height={64} />
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
    </Link>
  );
};

export default HistoryCard;
