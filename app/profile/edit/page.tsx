import UpdateProfileForm from "./components/edit-page";
import { Suspense } from "react";
import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import type { User } from "@/app/lib/definition";
import { getData } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const user = await authenticatedUser();
  if (!user) {
    redirect("/signin");
  }

  let userData: User | undefined = await getData(user.userId);

  if (!userData) {
    console.error("Error fetching user data");
    return <div>Error loading user data</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateProfileForm initialUserData={userData} userId={user.userId} />
    </Suspense>
  );
}
