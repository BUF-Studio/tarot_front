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
           Create Account 
          </h1>
          <p className="body-large">
            Tell a bit about yourself
          </p>
        </div>
        <form className={styles.form}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder='johhnydepp@tarotmate.com'
            className={styles.input}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            placeholder='Johnny Depp'
            className={styles.input}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            placeholder='60123456789'
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
              <Link
                href="/create-account2"
                className={`$ ${styles.login}`}
                style={{ textDecoration: "none" }}
              >
                Next
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp