"use client";

import React from "react";
import styles from "./paymentSuccess.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";

const PaymentSuccess = ({
  searchParams: { plan },
}: {
  searchParams: { plan: string };
}) => {
  return (
    <div className={styles.container}>
      <img src="/correct.png" alt="Success" />
      <p className="title-large">
        You have successfully subscribe to
        <strong> {plan} plan</strong>
      </p>
      <Link href={"/"}>
        <Button variant="contained" color="primary" className={styles.button}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
