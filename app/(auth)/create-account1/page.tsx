"use client";

import React from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/context/AuthProvider";

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();

  const { unregisteredUser, setUnregisteredUser } = auth;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUnregisteredUser({ ...unregisteredUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Form submitted: ${unregisteredUser}`);
    router.push("/create-account2");
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
          <h1 className={`headline-large ${styles.title}`}>Create Account</h1>
          <p className={`body-large ${styles.subtitle}`}>
            Tell a bit about yourself
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            placeholder="johhnydepp@tarotmate.com"
            onChange={handleInputChange}
            className={styles.input}
          />
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="outlined"
            placeholder="Johnny Depp"
            onChange={handleInputChange}
            className={styles.input}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            variant="outlined"
            placeholder="60123456789"
            onChange={handleInputChange}
            className={styles.input}
          />
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

export default SignUp;
