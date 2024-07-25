"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import styles from "./forgotPassword.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import {
  handleConfirmResetPassword,
  handleResetPassword,
} from "@/app/lib/aws/cognito";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { Check, Close } from "@mui/icons-material";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validatePassword = useCallback(() => {
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

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "error" | "success",
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    let error = "";
    if (email === "") {
      error = "Email is required";
    } else if (!validateEmail(email)) {
      error = "Invalid email address";
    } else {
      error = "";
    }
    setErrors(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code || !password || !confirmPassword) {
      setSnackbar({
        open: true,
        message: "All fields are required.",
        severity: "error",
      });
      return;
    }

    if (errors) {
      setSnackbar({
        open: true,
        message: errors,
        severity: "error",
      });
      return;
    }

    if (!Object.values(validations).every(Boolean)) {
      setSnackbar({
        open: true,
        message: "Please ensure all conditions are met.",
        severity: "error",
      });
      return;
    }

    const { success, message } = await handleConfirmResetPassword(
      email,
      code,
      password
    );
    if (success) {
      setSnackbar({ open: true, message: message, severity: "success" });
        router.push("/signin");
    } else {
      setSnackbar({ open: true, message, severity: "error" });
      return;
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleResendCode = async () => {
    if (!email || errors) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address to resend the code.",
        severity: "error",
      });
      return;
    }

    setIsResendDisabled(true);
    setResendTimer(30);

    const { success, message } = await handleResetPassword(email);
    if (success) {
      setSnackbar({ open: true, message: message, severity: "success" });
    } else {
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
          <h1 className={`headline-large ${styles.title}`}>Forgot Password</h1>
          <p className={`body-large ${styles.subtitle}`}>
            Enter your registered email address to reset your password
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.emailContainer}>
            <TextField
              id="email"
              label="Email"
              name="email"
              value={email}
              variant="outlined"
              type="email"
              placeholder="johhnydepp@tarotmate.com"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              error={!!errors}
              helperText={errors}
              className={styles.input}
            />
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              onClick={handleResendCode}
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : "Send Code"}
            </Button>
          </div>
          <TextField
            id="code"
            label="Verification Code"
            name="code"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
            variant="outlined"
            placeholder="123456"
            className={styles.input}
          />
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

export default ForgotPassword;
