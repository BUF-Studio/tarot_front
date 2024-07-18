"use client";

import React, { type FormEvent, useCallback, useState, useRef } from "react";
import styles from "./confirmSignUp.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { handleConfirmSignUp} from "../../lib/aws/cognito";
import { useAuth } from "@/app/lib/context/AuthProvider";

const ConfirmSignUp = () => {
  const router = useRouter();
  const auth = useAuth();
  const { unregisteredUser } = auth;
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verificationCode.length !== 6) {
      console.log("Verification code must be 6 digits");
      return;
    }

    try {
      await handleConfirmSignUp(unregisteredUser.email, verificationCode);
      router.push('/signin');
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  };

  return (
    <div className={styles.loginContainer}>
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
            onChange={(event) =>
              setVerificationCode(event.target.value)
            }
            className={styles.input}
          />
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button}>
              <Link href="/signin" style={{ textDecoration: "none" }}>
                Back
              </Link>
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
