import { Suspense } from 'react';
import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import type { User } from "@/app/lib/definition";
import UpdateProfileForm from "./components/edit-page";
import { getData } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function UpdateProfilePage() {
  const user = await authenticatedUser();
  if (!user) {
    redirect("/signin");
  }

  let userData: User;
  try {
    userData = await getData(user.userId);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return <div>Error loading user data</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateProfileForm initialUserData={userData} userId={user.userId} />
    </Suspense>
  );
}