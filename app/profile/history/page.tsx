"use client";

import React, { useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import HistoryCard from "./components/history-card";
import useSearch from "./hooks/use-search";
import useSWR from "swr";

import { Session } from "./session-interface";
import { useAuthUser } from "@/app/_hooks/use-auth-user";
import { HistoryContext } from "@/app/lib/context/history-provider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function History() {
  const user = useAuthUser();
  const { histories, updateHistories } = useContext(HistoryContext);

  const { data, error, isLoading } = useSWR(
    user ? `/api/history?id=${user.userId}` : null,
    fetcher
  );

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      updateHistories(data.data);
    }
  }, [data, updateHistories]);

  const { searchQuery, setSearchQuery, filteredHistories } =
    useSearch(histories);

  if (error)
    return (
      <p className="body-large" style={{ textAlign: "center" }}>
        Failed to load
      </p>
    );

  if (isLoading)
    return (
      <p className="body-large" style={{ textAlign: "center" }}>
        Loading...
      </p>
    );

  if (!filteredHistories || filteredHistories.length === 0) {
    return (
      <p className="body-large" style={{ textAlign: "center" }}>
        No history yet...
      </p>
    );
  }

  return (
    <Container maxWidth="sm">
      <TextField
        fullWidth
        id="search"
        label="Search History"
        name="search"
        autoComplete="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      <Divider sx={{ my: 2 }} />
      {filteredHistories.map((session: Session) => (
        <HistoryCard key={session.session_id} session={session} />
      ))}
    </Container>
  );
}
