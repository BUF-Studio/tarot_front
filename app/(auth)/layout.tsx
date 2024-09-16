"use client";

import { SnackbarProvider } from "../lib/context/snackbar-context";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
