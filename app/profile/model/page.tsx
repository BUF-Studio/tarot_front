import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import type { User } from "@/app/lib/definition";
import { redirect } from "next/navigation";
import ModelPage from "./components/model-page";
import { getData } from "@/app/actions";
import { Suspense } from "react";

export default async function ModelPageWrapper() {
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
      <ModelPage initialUserData={userData} userId={user.userId} />
    </Suspense>
  );
}
