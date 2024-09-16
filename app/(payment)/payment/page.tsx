"use client";

import React from "react";
import convertToSubcurrency from "../../_utils/currency-formatter";
import CheckoutForm from "../../components/checkout-form";
import styles from "./payment.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toTitleCase } from "../../_utils/text-formatter";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Payment = ({
  searchParams: { plan },
}: {
  searchParams: { plan: string };
}) => {
  const amount = plan == "free" ? 0 : "standard" ? 19 : 39;

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
        {plan == "free" ? (
          <div className={styles.form}>
            <Link href={"/payment-success?plan=free"}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  borderRadius: 100,
                  textTransform: "capitalize",
                  boxShadow: "none",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
                type="submit"
              >
                Subscribe to free
              </Button>
            </Link>
          </div>
        ) : (
          <div className={styles.form}>
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                currency: "myr",
                amount: convertToSubcurrency(amount),
              }}
            >
              <CheckoutForm amount={amount} plan={plan} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
