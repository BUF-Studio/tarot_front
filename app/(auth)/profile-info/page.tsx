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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      id: user?.userId,
      email: user?.email,
      username: formData.get("username"),
      phone_number: formData.get("phone"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    };

    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const createdUser = await response.json();
      console.log("User created:", createdUser);
      showSnackbar("Successfully added user", "success");
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
      showSnackbar(getErrorMessage(error), "error");
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
            Profile Information
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            Tell us abit about yourself
          </p>
          <p>User email {user?.email}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            name="username"
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
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
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
              min: 0,
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
