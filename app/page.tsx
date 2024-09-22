import styles from "@/app/landing.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";
import Person from "@mui/icons-material/Person";
import PictureMarquee from "@/app/components/card-marquee";
import PlanInfoCard from "@/app/components/plan-info-card";
import FeatureIntro from "@/app/components/feature-intro";
import SubscriptionSection from "@/app/components/subscription-section";

import { toTitleCase } from "@/app/_utils/text-formatter";
import { authenticatedUser } from "./_utils/amplify-server-utils";
import { getData } from "./actions";
import type { User } from "./lib/definition";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await authenticatedUser();
  let userData: User | undefined = await getData(user?.userId ?? "");

  return (
    <>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <PictureMarquee />
          <h1 className={"display-medium"}>
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
