"use client";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Alert, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { getErrorMessage } from "@/app/_utils/get-error-message";
import { useSnackbar } from "@/app/components/SnackbarContext";
import { useAuthUser } from "@/app/_hooks/use-auth-user";

const SignUp = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const user = useAuthUser();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
            Profile Information
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            Tell us abit about yourself
          </p>
          <p>
            User email {user?.email}
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Username"
            name="name"
            variant="outlined"
            placeholder="Johnny Depp"
            className={styles.input}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            variant="outlined"
            placeholder="101112222"
            className={styles.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">60</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10, // Max 10 digits after 60
            }}
          />
          {/* Gender and age */}
          <FormControl fullWidth variant="outlined" className={styles.input}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="age"
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            placeholder="25"
            className={styles.input}
            inputProps={{
              min: 18,
              max: 120,
            }}
          />

          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button}>
              <Link
                href="/signup/account-setup"
                style={{ textDecoration: "none" }}
              >
                Back
              </Link>
            </Button>
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              type="submit"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
