"use client";

import { HistoryContextProvider } from "../lib/context/history-provider";
export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HistoryContextProvider>{children}</HistoryContextProvider>;
}
