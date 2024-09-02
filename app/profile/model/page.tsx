import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import { Model, User } from "@/app/lib/definition";

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

async function updateModel(formData: FormData) {
  'use server';
  
  const model = formData.get("model-group") as Model;
  const userId = formData.get("userId") as string;

  if (!model || !userId) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(`http://${process.env.BACKEND_URL}/updateUserModel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, model }),
    });

    if (!response.ok) {
      throw new Error('Failed to update model');
    }

    // Optionally, you can redirect or revalidate the page here
    // For example: redirect('/profile');
  } catch (error) {
    console.error('Error updating model:', error);
    // Handle error (e.g., set an error message in the server component's state)
  }
}

export default async function ModelPage() {
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
    <Container maxWidth="sm">
      <FormControl component="form" action={updateModel}>
        <FormLabel id="model-label" sx={{ mb: 1 }}>
          <h1 className="headline-large">Subscription Model</h1>
        </FormLabel>
        <RadioGroup
          aria-labelledby="model-label"
          defaultValue={userData.model}
          name="model-group"
        >
          <FormControlLabel
            value={Model.GPT4O}
            control={<Radio />}
            label="GPT 4o"
          />
          <FormControlLabel
            value={Model.GPT4OMini}
            control={<Radio />}
            label="GPT 4o mini"
          />
          <FormControlLabel
            value={Model.Llama31}
            control={<Radio />}
            label="Llama 3.1"
          />
        </RadioGroup>
        <input type="hidden" name="userId" value={user.userId} />
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
          Update
        </Button>
      </FormControl>
    </Container>
  );
}