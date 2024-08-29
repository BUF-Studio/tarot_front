"use client";
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

const Register = () => {
  useLayoutEffect(() => {
    redirect("/signup/account-setup");
  }, []);
  return <section></section>;
};

export default Register;
