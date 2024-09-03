import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ListButton from "./components/list-button";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LogoutButton from "./components/logout-button";
import Link from "next/link";

import { Gender, User } from "@/app/lib/definition";
import { authenticatedUser } from "../_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import { getData } from "../actions";

export default async function ProfilePage() {
  const user = await authenticatedUser();

  if (!user) {
    redirect("/signin");
  }

  let userData;
  try {
    userData = await getData(user.userId);
    console.log("User data:", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2} alignItems="start" mb={2}>
        <h1 className="headline-large">{userData?.name}</h1>
        <p className="title-large">{userData?.email}</p>
        <Stack direction="row" spacing={2}>
          <Chip
            color="primary"
            icon={<LocalPhoneRoundedIcon />}
            label={userData?.phone_number}
          />
          <Chip
            color="primary"
            icon={<Face6RoundedIcon />}
            label={userData?.age}
          />
          <Chip
            color="primary"
            icon={
              userData?.gender == Gender.Female ? (
                <FemaleRoundedIcon />
              ) : (
                <MaleRoundedIcon />
              )
            }
            label={userData?.gender}
          />
        </Stack>
      </Stack>
      <Divider />
      <Link href="/profile/model" passHref legacyBehavior>
        <ListButton title="Subscription Model" />
      </Link>
      <Link href="/profile/history" passHref legacyBehavior>
        <ListButton title="History" />
      </Link>
      <Link href="/profile/edit" passHref legacyBehavior>
        <ListButton title="Edit Profile" />
      </Link>
      <LogoutButton />
    </Container>
  );
}
