import React from "react";
import styles from "@/app/landing.module.scss";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { SubscriptionType, useUser } from "../lib/context/user-provider";

const SubscriptionSection = () => {
  const router = useRouter();
  const { user } = useUser();

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
      features: ["Unlimited AI-powered readings"],
      btnText: "Choose Standard",
    },
  ];

  const navigateToPayment = (plan: SubscriptionType) => {
    router.push(`/payment?plan=${plan.toLowerCase()}`);
  };

  const getButtonText = (plan: typeof plans[0]): string => {
    if (!user) {
      return plan.btnText;
    }

    if (user.subscription_type === plan.type) {
      return "Current Plan";
    }

    return plan.btnText;
  };

  const renderPlan = (plan: typeof plans[0]) => (
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
      <Button
        variant="contained"
        className={styles.planButton}
        onClick={() => navigateToPayment(plan.type)}
        disabled={user?.subscription_type === plan.type}
      >
        {getButtonText(plan)}
      </Button>
    </div>
  );

  return (
    <section className={styles.tarotMateSection}>
      <h2 className={`${styles.tarotMateTitle} display-medium`}>TarotMate</h2>
      <p className={`${styles.tarotMateSubtitle} title-medium`}>
        Your personal AI-Powered Tarot Reading Companion
      </p>
      <div className={styles.plansContainer}>{plans.map(renderPlan)}</div>
    </section>
  );
};

export default SubscriptionSection;