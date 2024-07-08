import React from 'react'
import styles from './signup.module.scss';
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

const SignUp = () => {
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
           Acount Credentials
          </h1>
          <p className="body-large">
            By signing up, you agree to our terms and conditions
          </p>
        </div>
        <form className={styles.form}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            className={styles.input}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button}>
              <Link href="/signin" style={{ textDecoration: "none" }}>
                Sign in
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
                Create Account
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp