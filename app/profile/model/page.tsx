"use client";

import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function ModelPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const model = formData.get("model-group") as string;

    // gpt4o, gpt4o-mini, llama3.1
    console.log(model);
  };

  return (
    <Container maxWidth="sm">
      <FormControl component="form" onSubmit={handleSubmit}>
        <FormLabel id="model-label" sx={{mb: 1}}>
          <h1 className="headline-large">Subscription Model</h1>
        </FormLabel>
        <RadioGroup
          aria-labelledby="model-label"
          defaultValue="llama3.1"
          name="model-group"
        >
          <FormControlLabel value="gpt4o" control={<Radio />} label="GPT 4o" />
          <FormControlLabel
            value="gpt4o-mini"
            control={<Radio />}
            label="GPT 4o mini"
          />
          <FormControlLabel
            value="llama3.1"
            control={<Radio />}
            label="Llama 3.1"
          />
        </RadioGroup>
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