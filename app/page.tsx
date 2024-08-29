"use client";
import styles from "@/app/landing.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import PictureMarquee from "@/app/components/card-marquee";
import SubscriptionSection from "@/app/components/subscription-section";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { useEffect, useState } from "react";
import { BsFillTelephoneFill, BsMailbox2 } from "react-icons/bs";
import { handleSignOut } from "@/app/lib/aws/cognito";
import { useAuthUser } from "@/app/_hooks/use-auth-user";
import { useRouter } from "next/navigation";
import { toTitleCase } from "@/app/_utils/text-formatter";
import { getUser } from "./lib/api";

export default function Home() {
  const router = useRouter();
  const user = useAuthUser();
  const [dbUser, setdbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrieveCurrentUser() {
      try {
        if (user?.userId) {
          console.log(`User ID used to retrieve data: ${user?.userId}`);
          const dbUser = await getUser(user?.userId);
          if (dbUser) {
            console.log(dbUser);
            setdbUser(dbUser);
          } else {
            router.push("/profile-info");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    }

    retrieveCurrentUser();
  }, [user, router]);

  const handleUserSignOut = async () => {
    await handleSignOut();
    router.push("/signin");
  };

  const navigateToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };

  return (
    <>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <PictureMarquee />
          <h1 className={`display-medium`}>
            Welcome {toTitleCase(dbUser?.username)}!
          </h1>
          <div className={styles.contactInfo}>
            <span className="title-medium">
              <BsMailbox2 size={24} className={styles.icon} />
              {dbUser?.email}
            </span>
            <span className="title-medium">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              {dbUser?.phone_number}
            </span>
            <span className="title-medium">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              {dbUser?.age}
            </span>
            <span className="title-medium">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              {dbUser?.gender}
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
                  onClick={() => navigateToPayment("standard")}
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
