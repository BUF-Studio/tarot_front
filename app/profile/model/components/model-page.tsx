'use client'

import type React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Model, type User } from "@/app/lib/definition";
import { useSnackbar } from "@/app/lib/context/snackbar-context";
import { updateModel } from "@/app/actions";

interface ModelPageProps {
  initialUserData: User;
  userId: string;
}

export default function ModelPage({ initialUserData, userId }: ModelPageProps) {
  const [userData, setUserData] = useState(initialUserData);
  const [isUpdating, setIsUpdating] = useState(false);
  const {showSnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(event.currentTarget);
    const result = await updateModel(formData);

    if (result.success) {
      setUserData({ ...userData, model: formData.get("model-group") as Model });
      showSnackbar('Model updated successfully', 'success');
    } else {
      showSnackbar(result.error || 'Failed to update model', 'error');
    }

    setIsUpdating(false);
  };

  return (
    <Container maxWidth="sm">
      <FormControl component="form" onSubmit={handleSubmit}>
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
        <input type="hidden" name="userId" value={userId} />
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
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </FormControl>
    </Container>
  );
}