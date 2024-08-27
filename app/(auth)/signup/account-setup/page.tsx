"use client";

import type React from "react";
import { useState } from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/context/AuthProvider";
import {
  Alert,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { handleSignUp } from "@/app/lib/aws/handleSignUp";
import { useSnackbar } from "@/app/components/SnackbarContext";

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await handleSignUp(formData);
      // if (result.success) {
        showSnackbar("Account created successfully", "success");
        // router.push(`/signup/verification?userId=${result.userId}`);
        // router.push(`/signup/verification?userId=${result.userId}`);
      // } else {
      //   showSnackbar(
      //     result.error ?? "An error has occured during signing you up",
      //     "error"
      //   );
      // }
    } catch (error) {
      showSnackbar("Error signing up", "error");
    }
  };

  return (
    <div style={{ height: "100%" }}>
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
              By signing up, you agree to our terms and conditions
            </p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              type="email"
              placeholder="johnnydepp@tarotmate.com"
              className={styles.input}
              required
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                required
              />
            </FormControl>
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
    </div>
  );
};

export default SignUp;
