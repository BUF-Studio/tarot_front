import React from "react";
import styles from "@/app/landing.module.scss";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";

const SubscriptionSection = () => {
  const router = useRouter();

  const plan = [
    {
      plan: "Free Plan",
      desc: "Perfect for beginners exploring the world of tarot",
      price: "RM 0 / month",
      features: [
        "1 free reading per week",
        "Access basic card history",
        "Daily card of the day",
        "Limited chat history",
      ],
      btnText: "Start Free",
      btnAction: () => navigateToPayment("free"),
    },
    {
      plan: "Standard Plan",
      desc: "For enthusiasts seeking deeper insights",
      price: "RM 19 / month",
      features: [
        "10 AI-powered readings per month",
        "Full access to card interpretation",
        "Personalized weekly horoscope",
        "Priority WhatsApp support",
      ],
      btnText: "Choose Standard",
      btnAction: () => navigateToPayment("standard"),
    },
    {
      plan: "Pro Plan",
      desc: "For serious tarot practitioners and professionals",
      price: "RM 39 / month",
      features: [
        "Unlimited AI-powered readings",
        "Advanced card interpretation",
        "Custom spread analysis",
        "Monthly live group reading session",
      ],
      btnText: "Go Pro",
      btnAction: () => navigateToPayment("pro"),
    },
  ];

  const navigateToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };
  return (
    <section className={styles.tarotMateSection}>
      <h2 className={`${styles.tarotMateTitle} display-medium`}>TarotMate</h2>
      <p className={`${styles.tarotMateSubtitle} title-medium`}>
        Your personal AI-Powered Tarot Reading Companion
      </p>
      <div className={styles.plansContainer}>
        {plan.map((plan, index) => (
          <div key={index} className={styles.planCard}>
            <h3 className={`${styles.planTitle} title-large`}>{plan.plan}</h3>
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
              onClick={plan.btnAction}
            >
              {plan.btnText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionSection;
