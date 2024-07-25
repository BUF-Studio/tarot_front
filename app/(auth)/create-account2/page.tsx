"use client";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import React, { useEffect, useState } from "react";
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
import {
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { handleSignUp } from "@/app/lib/aws/cognito";
import { useAuth } from "@/app/lib/context/AuthProvider";

const SignUp = () => {
  const router = useRouter();
  const { unregisteredUser } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
    lowercase: false,
    match: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "error" | "success",
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validatePassword = React.useCallback(() => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      match: password === confirmPassword && password !== "",
    });
  }, [password, confirmPassword]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword, validatePassword]);

  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!allValid) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before submitting",
        severity: "error",
      });
      return;
    }

    try {
      const { success, message } = await handleSignUp(
        unregisteredUser.email,
        `+60${unregisteredUser.phone}`,
        unregisteredUser.name,
        password
      );
      if (success) {
        setSnackbar({ open: true, message: message, severity: "success" });
        router.push("/confirm-signup");
      } else {
        setSnackbar({ open: true, message, severity: "error" });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  interface ValidationItemProps {
    valid: boolean;
    text: string;
  }

  const ValidationItem: React.FC<ValidationItemProps> = ({ valid, text }) => (
    <ListItem>
      <ListItemIcon>
        {valid ? <Check color="success" /> : <Close color="error" />}
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          color: valid ? "success.main" : "error.main",
        }}
      />
    </ListItem>
  );

  return (
    <div className={styles.loginContainer}>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
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
          <h1 className={`headline-large ${styles.title}`}>
            Account Credentials
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            By signing up, you agree to our terms and conditions
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth margin="normal">
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
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
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
              disabled={!allValid}
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
