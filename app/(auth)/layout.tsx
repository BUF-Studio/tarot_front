"use client";

import { SnackbarProvider } from "../components/SnackbarContext";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
