import React from "react";
import { Button, LinearProgress } from "@mui/material";
import styles from "@/app/landing.module.scss";
import { SubscriptionType, useUser } from "../lib/context/user-provider";
import { useRouter } from "next/navigation";

interface PlanInfoCardProps {
  usage?: number;
  subscription_type?: SubscriptionType;
  period?: string;
}

const PlanInfoCard: React.FC<PlanInfoCardProps> = ({
  usage,
  subscription_type,
}) => {
  const router = useRouter();

  const toTitleCase = (str: string = "") => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const effectiveSubscriptionType = subscription_type || SubscriptionType.Free;
  const isFree = effectiveSubscriptionType === SubscriptionType.Free;
  const effectiveUsage = usage ?? 0;
  const readingsLeft = isFree ? Math.max(0, 2 - effectiveUsage) : Infinity;
  const progressValue = isFree
    ? ((readingsLeft / 2) * 100)
    : 100;

  const navigateToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };

  return (
    <div className={styles.planInfoContainer}>
      <div className={styles.planInfo}>
        <div className={styles.planDetails}>
          <span className={`${styles.plan} headline-medium`}>
            {`${toTitleCase(effectiveSubscriptionType)} Plan`}
          </span>
          <span className="body-large">Tarotmate Subscription Plan</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.textRow}>
            <span className="title-medium">Reading Left</span>
            <span className="title-medium">
              {isFree ? `${readingsLeft}/2` : "Unlimited"}
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            className={styles.progress}
          />
          {isFree && (
            <Button
              variant="contained"
              className={styles.button}
              onClick={() => navigateToPayment("premium")}
            >
              Upgrade Plan
            </Button>
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
