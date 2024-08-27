"use client";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

const Register = () => {
  useLayoutEffect(() => {
    redirect("/signup/account-setup");
  }, []);
  return <>
      <CssBaseline />
  
  </>;
};

export default Register;
