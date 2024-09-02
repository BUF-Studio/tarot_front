"use client";

import React from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import SignupTimeline from "@/app/components/signup-timeline";

import { handleSignUp } from "@/app/lib/aws/cognito";
import { useSnackbar } from "@/app/components/SnackbarContext";
import Logo from "@/app/components/logo";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
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
      if (result.success) {
        showSnackbar("Account created successfully", "success");
      } else {
        showSnackbar(
          result.error ?? "An error has occured during signing you up",
          "error"
        );
      }
    } catch (error) {
      showSnackbar("Error signing up", "error");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginHeader}>
          <div>
            <Logo />
            <h1 className={`headline-large ${styles.title}`}>Create Account</h1>
            <p className={`body-large ${styles.subtitle}`}>
              By signing up, you agree to our terms and conditions
            </p>
          </div>
          <SignupTimeline />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            placeholder="johnnydepp@tarotmate.com"
            required
            margin="normal"
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
                    {showPassword ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
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
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
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
  );
};

export default SignUp;
