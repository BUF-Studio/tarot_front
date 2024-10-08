// layout.tsx
import ThemeRegistry from "./components/theme-registry";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import "@/app/globals.scss";
import "@/app/lib/theme/font.css";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
