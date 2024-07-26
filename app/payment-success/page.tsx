"use client";

import React from "react";
import styles from "./paymentSuccess.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const PaymentSuccess = ({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <img src="/correct.png" alt="Success" />
      <p className="title-large">
        You have successfully paid
        <strong> RM{amount}</strong>
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
        className={styles.button}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default PaymentSuccess;
