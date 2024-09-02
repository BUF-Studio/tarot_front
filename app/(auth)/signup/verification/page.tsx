"use client";

import React, { type FormEvent, useState, useEffect } from "react";
import styles from "./confirmSignUp.module.scss";
import Button from "@mui/material/Button";
import Logo from "@/app/components/logo";
import TextField from "@mui/material/TextField";
import SignupTimeline from "@/app/components/signup-timeline";

import { useRouter, useSearchParams } from "next/navigation";
import { handleConfirmSignUp } from "@/app/lib/aws/handleConfirmSignUp";
import { getErrorMessage } from "@/app/_utils/get-error-message";
import { useSnackbar } from "@/app/components/SnackbarContext";
import { handleSendEmailVerificationCode } from "@/app/lib/aws/cognito";

const ConfirmSignUp = () => {
  const router = useRouter();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) {
      showSnackbar("Invalid access. Redirecting to sign up page.", "error");
      router.push("/signup");
    }
  }, [userId, router, showSnackbar]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!userId) {
      showSnackbar("Invalid user ID. Please sign up again.", "error");
      router.push("/signup");
      return;
    }

    try {
      const result = await handleConfirmSignUp(userId, formData);
      // if (success) {
      showSnackbar("Successful Verify Your Account", "success");
      //   router.push("/signup/profile-info");
      // } else {
      //   showSnackbar(
      //     message ?? "An error has occured during verification",
      //     "error"
      //   );
      // }
    } catch (error) {
      showSnackbar(getErrorMessage(error), "error");
    }
  };

  const handleResendCode = async () => {
    if (!userId) {
      showSnackbar("Invalid user ID. Please sign up again.", "error");
      router.push("/signup");
      return;
    }

    const result = await handleSendEmailVerificationCode(userId ?? "");
    if (result.success) {
      showSnackbar("Verification code sent", "success");
    } else {
      showSnackbar(
        result.error ?? "An error has occured during sending verification code",
        "error"
      );
    }
    setIsResendDisabled(true);
    setResendTimer(30);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginHeader}>
          <div>
            <Logo />
            <h1 className={`headline-large ${styles.title}`}>
              Verify Your Email
            </h1>
            <p className={`body-large ${styles.subtitle}`}>
              Enter the six digit code we sent to your email address to verify
              your new TarotMate account
            </p>
          </div>
          <SignupTimeline />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="code"
            label="Code"
            name="code"
            variant="outlined"
            placeholder="123456"
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <Button
              variant="outlined"
              onClick={handleResendCode}
              disabled={isResendDisabled}
              className={`${styles.button} `}
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend Code"}
            </Button>
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              type="submit"
            >
              Verify
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
