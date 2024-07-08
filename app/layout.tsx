import type { Metadata } from "next";
import "./globals.scss";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeRegistry from "./components/ThemeRegistry";

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
        <ThemeRegistry>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
