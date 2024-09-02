import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import { User, Gender } from "@/app/lib/definition";

async function getData(userId: string): Promise<User> {
  const res = await fetch(
    `http://${process.env.BACKEND_URL}/user?userId=${encodeURIComponent(
      userId
    )}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function updateProfile(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const phone_number = formData.get("phone") as string;
  const age = formData.get("age") as string;
  const gender = formData.get("gender") as Gender;

  if (!userId || !username || !phone_number || !age || !gender) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(
      `http://${process.env.BACKEND_URL}/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          username,
          phone_number,
          age: parseInt(age),
          gender,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    redirect("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    // Handle error (e.g., set an error message in the server component's state)
  }
}

export default async function UpdateProfilePage() {
  const user = await authenticatedUser();
  if (!user) {
    redirect("/signin");
  }

  let userData: User;
  try {
    userData = await getData(user.userId);
    console.log("User data:", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return <div>Error loading user data</div>;
  }

  return (
    <Container maxWidth="sm" component="form" action={updateProfile}>
      <h1 className="headline-large">Update Profile</h1>
      <input type="hidden" name="userId" value={user.userId} />
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        defaultValue={userData.name}
        fullWidth
        margin="normal"
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone"
        variant="outlined"
        defaultValue={userData.phone_number}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">60</InputAdornment>,
        }}
        inputProps={{
          maxLength: 10,
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          label="Gender"
          defaultValue={userData.gender}
        >
          <MenuItem value={Gender.Male}>Male</MenuItem>
          <MenuItem value={Gender.Female}>Female</MenuItem>
          <MenuItem value={Gender.PreferNotToSay}>Prefer not to say</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="age"
        name="age"
        label="Age"
        type="number"
        variant="outlined"
        defaultValue={userData.age}
        fullWidth
        margin="normal"
        inputProps={{
          min: 0,
          max: 120,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "fit-content",
          textTransform: "capitalize",
          boxShadow: "none",
          mt: 2,
          borderRadius: 16,
        }}
      >
        Update Profile
      </Button>
    </Container>
  );
}
