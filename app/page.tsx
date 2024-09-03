import styles from "@/app/landing.module.scss";
import Button from "@mui/material/Button";
import PictureMarquee from "@/app/components/card-marquee";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import PlanInfoCard from "./components/plan-info-card";
import SubscriptionSection from "./components/subscription-section";
import Person from "@mui/icons-material/Person";
import FeatureIntro from "./components/feature-intro";

import { toTitleCase } from "@/app/_utils/text-formatter";
import { authenticatedUser } from "./_utils/amplify-server-utils";
import { User } from "@/app/lib/definition";
import { redirect } from "next/navigation";

async function getData(userId: string): Promise<User> {
  const res = await fetch(
    `http://${process.env.BACKEND_URL}/user?userId=${encodeURIComponent(
      userId
    )}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const user = await authenticatedUser();

  let userData;
  try {
    userData = await getData(user?.userId ?? "");
    console.log("User data:", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <PictureMarquee />
          <h1 className={`display-medium`}>
            Welcome {userData ? toTitleCase(userData.name) : "to TarotMate"}!
          </h1>
          {userData && (
            <PlanInfoCard
              usage={userData.usage}
              subscription_type={userData.subscription_type}
            />
          )}
          <Link href={userData ? "/profile" : "/signin"}>
            <Button
              variant="contained"
              className={styles.button}
              startIcon={<Person />}
            >
              {userData ? userData.name : "Login"}
            </Button>
          </Link>
        </section>
      </div>
      <FeatureIntro />
      <SubscriptionSection
        currentUserSubscription={userData?.subscription_type}
      />
    </>
  );
}
