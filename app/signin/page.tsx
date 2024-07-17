"use client";

import React, { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import styles from "./signin.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { handleSignIn } from "../lib/aws/cognito";

const SignIn = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (formData: FormData) => {
    // Handle sign-in logic here
    await handleSignIn(formData)
    console.log("Form submitted");
    router.push("/");
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
          <h1 className={`headline-large ${styles.title}`}>Sign In</h1>
          <p className={`body-large ${styles.subtitle}`}>
            By signing in, you agree to our terms and conditions
          </p>
        </div>
        <form className={styles.form} action={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            className={styles.input}
            fullWidth
          />
          <FormControl variant="outlined">
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
            />
          </FormControl>
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
              {/* <Link href="/" style={{ textDecoration: "none", color: "inherit" }}> */}
              Sign In
              {/* </Link> */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
