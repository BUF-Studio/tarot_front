"use client";

import React, { type FormEvent, useCallback, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styles from "./signup.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { handleSignUp } from "../../lib/aws/cognito";
import { useAuth } from "@/app/lib/context/AuthProvider";

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        urlParams.set(key, value);
      }

      return urlParams.toString();
    },
    [searchParams]
  );

  const handleSubmit = async (formData: FormData) => {
    const rawFormData = {
      email: formData.get("email"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    console.log(
      `Phone: ${rawFormData.phone} Email: ${rawFormData.email} Name: ${rawFormData.name} Password: ${rawFormData.password} Confirm Password: ${rawFormData.confirmPassword}`
    );
    // Login logic here
    // TODO: Implement form validation
    await handleSignUp(formData);
    auth.setEmail(rawFormData.email as string);
    console.log(`email: ${rawFormData.email}`);
    router.push("/confirm-signup");
    
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
          <h1 className={`headline-large ${styles.title}`}>Create Account</h1>
          <p className={`body-large ${styles.subtitle}`}>
            Tell a bit about yourself
          </p>
        </div>
        <form className={styles.form} action={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            placeholder="johhnydepp@tarotmate.com"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            className={styles.input}
          />
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="outlined"
            placeholder="Johnny Depp"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            className={styles.input}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            variant="outlined"
            placeholder="60123456789"
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
            className={styles.input}
          />
          <FormControl variant="outlined" className={styles.input}>
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
          <FormControl variant="outlined" className={styles.input}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
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
