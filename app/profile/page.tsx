"use client";

import React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ListButton from "./components/list-button";
import Chip from "@mui/material/Chip";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const gender = "female";

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2} alignItems="start" mb={2}>
        <h1 className="headline-large">Gih Ming</h1>
        <p className="title-large">n.gihming@yahoo.com</p>
        <Stack direction="row" spacing={2}>
          <Chip icon={<LocalPhoneRoundedIcon />} label="010-5159602" />
          <Chip icon={<Face6RoundedIcon />} label="16" />
          <Chip
            icon={
              gender == "female" ? <FemaleRoundedIcon /> : <MaleRoundedIcon />
            }
            label={gender}
          />
        </Stack>
      </Stack>
      <Divider />
      <ListButton
        title="Subscription Modal"
        onClick={() => router.push("/profile/model")}
      />
      <ListButton title="History" onClick={() => router.push("/history")} />
      <ListButton title="Edit Profile" onClick={() => router.push("/profile/edit")} />
      <ListButton
        title="Log Out"
        onClick={() => {
          // TODO logout
        }}
      />
    </Container>
  );
}
