"use client";

import type React from "react";
import { type FormEvent, useState, useEffect } from "react";
import styles from "./confirmSignUp.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from "../../lib/aws/cognito";
import { useAuth } from "@/app/lib/context/AuthProvider";
import { Alert, Snackbar } from "@mui/material";

const ConfirmSignUp = () => {
  const router = useRouter();
  const auth = useAuth();
  const { unregisteredUser } = auth;
  const [verificationCode, setVerificationCode] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "error" | "success",
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

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

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(input);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verificationCode.length !== 6) {
      setSnackbar({
        open: true,
        message: "Please enter a valid verification code",
        severity: "error",
      });
      return;
    }

    try {
      const {success, message} = await handleConfirmSignUp(unregisteredUser.email, verificationCode);
      if (success) {
        setSnackbar({ open: true, message, severity: "success" });
        router.push("/signin");
      } else {
        setSnackbar({ open: true, message, severity: "error" });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleResendCode = async () => {
    const result = await handleSendEmailVerificationCode(
      { message: "", errorMessage: "" },
      unregisteredUser.email
    );
    if (result.errorMessage) {
      setSnackbar({
        open: true,
        message: result.errorMessage,
        severity: "error",
      });
      return;
    }
    setIsResendDisabled(true);
    setResendTimer(30);
  };

  return (
    <div className={styles.loginContainer}>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className={styles.loginForm}>
        <div className={styles.loginHeader}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className={styles.loginLogo}
          />
          <h1 className={`headline-large ${styles.title}`}>
            Verify Your Email
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            Enter the six digit code we sent to your email address to verify
            your new TarotMate account
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="flex justify-between mb-5">
            <TextField
              id="code"
              label="Code"
              name="code"
              variant="outlined"
              placeholder="123456"
              onChange={handleCodeChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              variant="outlined"
              onClick={handleResendCode}
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend Code"}
            </Button>
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
