import React from "react";
import styles from "./signin.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={64}
          height={64}
          className={styles.loginLogo}
        />
        <div className={styles.loginHeader}>
          <h1
            className="headline-large"
            style={{ fontWeight: "700", marginBottom: "1rem" }}
          >
            Sign In
          </h1>
          <p className="body-large">
            By signing in, you agree to our terms and conditions
          </p>
        </div>
        <form className={styles.form}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            className={styles.input}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            className={styles.input}
          />
          <Link
            href="/forgot-email"
            className={`${styles.forgotEmail} body-large`}
          >
            Forgot email?
          </Link>
          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button}>
              <Link href="/create-account1" style={{ textDecoration: "none" }}>
                Create Account
              </Link>
            </Button>
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              type="submit"
            >
              <Link
                href="/"
                className={`$ ${styles.login}`}
                style={{ textDecoration: "none" }}
              >
                Sign In
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
