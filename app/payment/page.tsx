"use client";

import React from "react";
import convertToSubcurrency from "../_utils/currency-formatter";
import CheckoutForm from "../components/CheckoutForm";
import styles from "./payment.module.scss";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toTitleCase } from "../_utils/text-formatter";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Payment = ({
  searchParams: { plan },
}: {
  searchParams: { plan: string };
}) => {
  const amount = plan == "standard" ? 19 : 39;

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentForm}>
        <div className={styles.paymentHeader}>
          <h1 className={`headline-large ${styles.title}`}>
            Subscribe to {toTitleCase(plan)}
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            You are about to pay RM{amount.toFixed(2)} for a {toTitleCase(plan)}{" "}
            subscription
          </p>
        </div>
        <div className={styles.form}>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              currency: "myr",
              amount: convertToSubcurrency(amount),
            }}
          >
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
