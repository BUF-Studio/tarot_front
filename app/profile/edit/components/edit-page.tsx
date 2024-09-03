"use client";

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { User, Gender } from "@/app/lib/definition";
import { useSnackbar } from "@/app/lib/context/snackbar-context";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/actions";

interface UpdateProfileFormProps {
  initialUserData: User;
  userId: string;
}

export default function UpdateProfileForm({
  initialUserData,
  userId,
}: UpdateProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Remove the '60' prefix if it exists
    setPhoneNumber(initialUserData.phone_number.replace(/^60/, ""));
  }, [initialUserData.phone_number]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only allow digits and limit to 10 characters (2 for country code + 8 for number)
    setPhoneNumber(value.replace(/\D/g, "").slice(0, 10));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Ensure the phone number always starts with '60'
    const fullPhoneNumber = phoneNumber.startsWith('60') ? phoneNumber : `60${phoneNumber}`;
    formData.set('phone', fullPhoneNumber);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        showSnackbar('Profile updated successfully', 'success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showSnackbar(error instanceof Error ? error.message : 'Failed to update profile', 'error');
    }
  };


  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <h1 className="headline-large">Update Profile</h1>
      <input type="hidden" name="userId" value={userId} />
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        defaultValue={initialUserData.name}
        fullWidth
        margin="normal"
      />
      <TextField
        id="phone"
        name="phone_number"
        label="Phone"
        variant="outlined"
        value={phoneNumber}
        onChange={handlePhoneChange}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">60</InputAdornment>,
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          label="Gender"
          defaultValue={initialUserData.gender}
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
        defaultValue={initialUserData.age}
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
        disabled={isUpdating}
        sx={{
          width: "fit-content",
          textTransform: "capitalize",
          boxShadow: "none",
          mt: 2,
          borderRadius: 16,
        }}
      >
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
    </Container>
  );
}
