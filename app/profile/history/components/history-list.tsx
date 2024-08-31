"use client";

import React from "react";
import useSWR from "swr";
import Container from "@mui/material/Container";
import HistoryCard from "./history-card";

import { useAuthUser } from "@/app/_hooks/use-auth-user";
import { Session } from "../session-interface";
import { HistoryContext } from "@/app/lib/context/history-provider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HistoryList() {
  const user = useAuthUser();
  const { histories, updateHistories } = React.useContext(HistoryContext);

  const { data, error, isLoading } = useSWR(
    `/api/history?id=${user?.userId}`,
    fetcher
  );

  React.useEffect(() => {
    if (data && Array.isArray(data.data)) {
      updateHistories(data.data);
    }
  }, [data, updateHistories]);

  if (error) return <div className={`body-large`}>Failed to load</div>;
  if (isLoading) return <div className={`body-large`}>Loading...</div>;

  if (!histories || histories.length === 0) {
    return (
      <Container maxWidth="sm">
        <p className="body-large" style={{ textAlign: "center" }}>
          No history yet...
        </p>
      </Container>
    );
  }

  return (
    <>
      {histories.map((session: Session) => (
        <HistoryCard key={session.session_id} session={session} />
      ))}
    </>
  );
}
