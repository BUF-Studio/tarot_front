"use client";

import React, { useState } from "react";
import styles from "./signup.module.scss";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Logo from "@/app/components/logo";

import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/app/_utils/get-error-message";
import { useAuthUser } from "@/app/_hooks/use-auth-user";
import { useSnackbar } from "@/app/lib/context/snackbar-context";
import { createUser } from "@/app/actions";
import { handleSignOut } from "@/app/lib/aws/cognito";

const SignUp = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const user = useAuthUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("id", user?.userId || "");
    formData.append("email", user?.attributes.email || "");

    const phoneNumber = formData.get('phone_number') as string;
    formData.set('phone_number', `60${phoneNumber}`);

    try {
      const result = await createUser(formData);

      if (result.success) {
        console.log("User created:", result.user);
        showSnackbar("Successfully added user", "success");
        router.push("/");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showSnackbar(getErrorMessage(error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await handleSignOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginHeader}>
          <Logo />
          <h1 className={`headline-large ${styles.title}`}>
            Profile Information
          </h1>
          <p className={`body-large ${styles.subtitle}`}>
            Tell us a bit about yourself
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            name="username"
            variant="outlined"
            placeholder="Johnny Depp"
            className={styles.input}
            required
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone_number"
            variant="outlined"
            placeholder="101112222"
            className={styles.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">60</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
            }}
            required
          />
          <FormControl
            fullWidth
            variant="outlined"
            className={styles.input}
            required
          >
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
            required
          />

          <div className={styles.buttonGroup}>
            <Button variant="text" className={styles.button} onClick={handleLogout}>
                Log out
            </Button>
            <Button
              variant="contained"
              className={`${styles.button} ${styles.login}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
