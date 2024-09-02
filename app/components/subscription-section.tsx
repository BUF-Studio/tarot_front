import React from "react";
import styles from "@/app/landing.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";

import { SubscriptionType } from "@/app/lib/definition";

interface SubscriptionSectionProps {
  currentUserSubscription?: SubscriptionType;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  currentUserSubscription,
}) => {
  const plans = [
    {
      type: SubscriptionType.Free,
      title: "Free Plan",
      desc: "Perfect for beginners exploring the world of tarot",
      price: "RM 0 / month",
      features: ["5 free reading per week"],
      btnText: "Start Free",
    },
    {
      type: SubscriptionType.Premium,
      title: "Paid Plan",
      desc: "For enthusiasts seeking deeper insights",
      price: "RM 19 / month",
      features: ["Unlimited AI-powered readings", "Upgraded AI models"],
      btnText: "Upgrade Now",
    },
  ];

  const getButtonText = (plan: (typeof plans)[0]): string => {
    if (!currentUserSubscription) {
      return plan.btnText;
    }

    if (currentUserSubscription === plan.type) {
      return "Current Plan";
    }

    return plan.btnText;
  };

  const renderPlan = (plan: (typeof plans)[0]) => (
    <div key={plan.type} className={styles.planCard}>
      <h3 className={`${styles.planTitle} title-large`}>{plan.title}</h3>
      <h4 className={`${styles.planDesc} title-medium`}>{plan.desc}</h4>
      <ul className={styles.planFeatures}>
        {plan.features.map((feature, index) => (
          <li key={index} className="body-large">
            ✨ {feature}
          </li>
        ))}
      </ul>
      <p className={`${styles.planPrice} headline-small`}>{plan.price}</p>
      <Link href={`/payment?plan=${plan.type}`} passHref>
        <Button
          variant="contained"
          className={styles.planButton}
          disabled={currentUserSubscription === plan.type}
        >
          {getButtonText(plan)}
        </Button>
      </Link>
    </div>
  );

  return (
    <section className={styles.tarotMateSection}>
      <h2 className={`${styles.tarotMateTitle} display-medium`}>
        TarotMate {currentUserSubscription}
      </h2>
      <p className={`${styles.tarotMateSubtitle} title-medium`}>
        Your personal AI-Powered Tarot Reading Companion
      </p>
      <div className={styles.plansContainer}>{plans.map(renderPlan)}</div>
    </section>
  );
};

export default SubscriptionSection;
