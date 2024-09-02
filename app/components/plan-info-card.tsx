import React from "react";
import { Button, LinearProgress } from "@mui/material";
import styles from "@/app/landing.module.scss";
import { SubscriptionType } from "@/app/lib/definition";
import Link from "next/link";

interface PlanInfoCardProps {
  usage?: number;
  subscription_type?: SubscriptionType;
  period?: string;
}

const PlanInfoCard: React.FC<PlanInfoCardProps> = ({
  usage,
  subscription_type,
}) => {
  const toTitleCase = (str: string = "") => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const isFree = subscription_type === SubscriptionType.Free;
  const effectiveUsage = usage ?? 0;
  const readingsLeft = isFree ? Math.max(0, 2 - effectiveUsage) : Infinity;
  const progressValue = isFree ? (readingsLeft / 2) * 100 : 100;

  return (
    <div className={styles.planInfoContainer}>
    <div className={styles.planInfo}>
        <div className={styles.planDetails}>
          <span className={`${styles.plan} headline-medium`}>
            {`${toTitleCase(subscription_type)} Plan`}
          </span>
          <span className="body-large">Tarotmate Subscription Plan</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.textRow}>
            <span className="title-medium">Reading Left</span>
            <span className="title-medium">{`${readingsLeft}/2`}</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            className={styles.progress}
          />
          {isFree && (
            <Link href="/payment?plan=premium" passHref>
              <Button
                variant="contained"
                className={styles.button}
              >
                Upgrade Plan
              </Button>
            </Link>
          )}
          {!isFree && (
            <span className="body-medium">
              Enjoy unlimited readings with your Premium plan!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanInfoCard;