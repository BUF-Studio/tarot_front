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
import useSWR from "swr";
import { useUser } from "./lib/context/user-provider";
import { Person } from "@mui/icons-material";
import PlanInfoCard from "./components/plan-info-card";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user, setUser } = useUser();

  const { data, error, isLoading } = useSWR(
    `/api/user?userId=${authUser?.userId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data.data);
    }
  }, [data, setUser]);

  if (error) return <div className={`body-large`}>Failed to load</div>;
  if (isLoading) return <div className={`body-large`}>Loading...</div>;

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
            Welcome {toTitleCase(user?.name)}!
          </h1>
          <PlanInfoCard usage={user?.usage} subscription_type={user?.subscription_type} />
          <Stack spacing={1} direction="row">
            <Link href={"/history"}>
              <Button
                variant="contained"
                className={styles.button}
                startIcon={<Person />}
                onClick={() => {}}
              >
                {user?.name}
              </Button>
            </Link>
          </Stack>
        </section>
      </div>
      <SubscriptionSection />
    </>
  );
}
