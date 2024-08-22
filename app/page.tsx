"use client";
import styles from "@/app/landing.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PictureMarquee from "@/app/components/card-marquee";
import SubscriptionSection from "@/app/components/subscription-section";
import Stack from "@mui/material/Stack";

import { useState } from "react";
import { BsFillTelephoneFill, BsMailbox2 } from "react-icons/bs";
import { MdUpgrade } from "react-icons/md";
import { handleSignOut } from "@/app/lib/aws/cognito";
import { useAuthUser } from "@/app/_hooks/use-auth-user";
import { useRouter } from "next/navigation";
import { toTitleCase } from "@/app/_utils/text-formatter";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const user = useAuthUser();

  const handleUserSignOut = async () => {
    await handleSignOut();
    router.push("/signin");
  };

  const navigateToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer}>
          <MdUpgrade size={48} />
          <span className="headline-medium">Upgrade Plan</span>
          <span className="body-large">Choose a plan that suits you best</span>
          <div className={styles.buttonGroup}>
            <Button
              variant="outlined"
              className={styles.planButton}
              onClick={() => navigateToPayment("standard")}
            >
              Standard Plan
            </Button>
            <Button
              variant="contained"
              className={styles.planButton}
              onClick={() => navigateToPayment("pro")}
            >
              Pro Plan
            </Button>
          </div>
        </Box>
      </Modal>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <PictureMarquee />
          <h1 className={`display-medium`}>
            Welcome {toTitleCase(user?.preferred_username)}!
          </h1>
          <div className={styles.contactInfo}>
            <span className="title-medium">
              <BsMailbox2 size={24} className={styles.icon} />
              {user?.email}
            </span>
            <span className="title-medium">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              {user?.phone_number}
            </span>
          </div>
          <div className={styles.planInfoContainer}>
            <div className={styles.planInfo}>
              <div className={styles.planDetails}>
                <span className={`${styles.plan} headline-medium`}>
                  Free Plan
                </span>
                <span className="body-large">Tarotmate subscription plan</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.textRow}>
                  <span className="title-medium">Reading Left</span>
                  <span className="title-medium">1/2</span>
                </div>
                <LinearProgress variant="determinate" value={0.5} />
                <Button
                  variant="contained"
                  className={styles.button}
                  onClick={handleOpen}
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>
          <Stack spacing={1} direction="row">
            <Link href={"/history"}>
              <Button
                variant="contained"
                className={styles.button}
                onClick={() => {}}
              >
                History
              </Button>
            </Link>
            <Button
              variant="text"
              className={styles.logout}
              onClick={handleUserSignOut}
            >
              Logout
            </Button>
          </Stack>
        </section>
      </div>
      <SubscriptionSection />
    </>
  );
}
