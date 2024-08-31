import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import HistoryList from "./components/history-list";

export default async function History() {
  return (
    <Container maxWidth="sm">
      <TextField
        fullWidth
        id="search"
        label="Search History"
        name="search"
        autoComplete="search"
      />
      <Divider sx={{ my: 2 }} />
      <HistoryList />
    </Container>
  );
}
