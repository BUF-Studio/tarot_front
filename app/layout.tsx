import type { Metadata } from "next";
import "./globals.scss";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeRegistry from "./components/ThemeRegistry";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import "./lib/font.css"
import { useEffect } from "react";
import { setupStorageListener } from "./lib/aws/authUtils";

export const metadata: Metadata = {
  title: "Tarotmate",
  description: "Your personal AI-Powered Tarot Reading Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <ConfigureAmplifyClientSide />
        <ThemeRegistry>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
