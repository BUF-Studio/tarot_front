import React from "react";
import Image from "next/image";
import LogoImg from "@/public/logo.png";

export default function Logo() {
  return (
    <Image src={LogoImg} alt="Logo" height={40} style={{ marginBottom: "1rem" }} />
  );
}
