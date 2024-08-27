"use client";

import { AuthContextProvider } from "@/app/lib/context/AuthProvider";
import { SnackbarProvider } from "../components/SnackbarContext";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <AuthContextProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </AuthContextProvider>
  );
}
