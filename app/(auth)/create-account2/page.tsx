"use client";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import React, { useEffect, useState, type FormEvent } from "react";

import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Check, Close } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { handleSignUp } from "@/app/lib/aws/cognito";
import { useAuth } from "@/app/lib/context/AuthProvider";

const SignUp = () => {
  const router = useRouter();
  const { unregisteredUser } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
    lowercase: false,
    match: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validatePassword = () => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      match: password === confirmPassword && password !== "",
    });
  };

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Checking done");
    if (allValid) {
      await handleSignUp(
        unregisteredUser.email,
        unregisteredUser.phone,
        unregisteredUser.name,
        password
      );
      console.log("Form submitted");
      router.push("/confirm-signup");
    } else {
      console.log("Form not submitted");
    }
  };

  const ValidationItem = ({ valid, text }) => (
    <ListItem>
      <ListItemIcon>
        {valid ? <Check color="success" /> : <Close color="error" />}
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{ color: valid ? "success" : "error" }}
      />
    </ListItem>
  );

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
            Acount Credentials
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            By signing up, you agree to our terms and conditions
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
          <FormControl variant="outlined">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
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
              label="Confirm Password"
            />
          </FormControl>
          <List sx={{ mt: 2 }}>
            <ValidationItem
              valid={validations.length}
              text="Minimum length - 8 characters"
            />
            <ValidationItem
              valid={validations.number}
              text="Contains at least 1 number"
            />
            <ValidationItem
              valid={validations.special}
              text="Contains at least 1 special character"
            />
            <ValidationItem
              valid={validations.uppercase}
              text="Contains at least 1 uppercase letter"
            />
            <ValidationItem
              valid={validations.lowercase}
              text="Contains at least 1 lowercase letter"
            />
            <ValidationItem valid={validations.match} text="Passwords match" />
          </List>

          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button}>
              <Link href="/create-account1" style={{ textDecoration: "none" }}>
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
