"use client";
import { createTheme } from "@mui/material/styles";
import { EB_Garamond } from "next/font/google";

const ebgaramond = EB_Garamond({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#362C5A",
    },
    secondary: {
      main: "#E3CE7F",
    },
  },
  typography: {
    fontFamily: ebgaramond.style.fontFamily,
  },
});

export default theme;
