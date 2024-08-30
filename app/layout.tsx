// layout.tsx
import ThemeRegistry from "./components/theme-registry";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import "./globals.scss";
import "./lib/font.css";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { UserContextProvider } from "./lib/context/user-provider";

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
          <UserContextProvider>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </UserContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
