"use client";

import type React from "react";
import { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/context/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const { unregisteredUser, setUnregisteredUser } = auth;
  const [alertOpen, setAlertOpen] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (value: string): boolean => {
    const digitsOnly = value.replace(/\D/g, "");
    return /^\d{9,10}$/.test(digitsOnly);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUnregisteredUser({
      ...unregisteredUser,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleEmailBlur = () => {
    let error = "";
    if (unregisteredUser.email === "") {
      error = "Email is required";
    } else if (!validateEmail(unregisteredUser.email)) {
      error = "Invalid email address";
    } else {
      error = "";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error,
    }));
  };

  const handlePhoneBlur = () => {
    let error = "";
    if (unregisteredUser.phone === "") {
      error = "Phone is required";
    } else if (!validatePhone(unregisteredUser.phone)) {
      error = "Invalid phone number";
    } else {
      error = "";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: error,
    }));
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.email || errors.phone) {
      setAlertOpen(true);
      console.log("Please fix the errors before submitting the form");
      return;
    }
    console.log(
      `Email: ${unregisteredUser.email}\nName: ${unregisteredUser.name}\nPhone: ${unregisteredUser.phone}`
    );
    router.push("/create-account2");
  };

  return (
    <div className={styles.loginContainer}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error">
          Please fix the errors before submitting the form
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
            value={unregisteredUser.email}
            variant="outlined"
            type="email"
            placeholder="johhnydepp@tarotmate.com"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            error={!!errors.email}
            helperText={errors.email}
            className={styles.input}
          />
          <TextField
            id="name"
            label="Username"
            name="name"
            value={unregisteredUser.name}
            variant="outlined"
            placeholder="Johnny Depp"
            onChange={handleInputChange}
            className={styles.input}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            value={unregisteredUser.phone}
            variant="outlined"
            placeholder="123456789"
            onChange={handleInputChange}
            className={styles.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">60</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10, // Max 10 digits after 60
            }}
            onBlur={handlePhoneBlur}
            error={!!errors.phone}
            helperText={errors.phone}
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
