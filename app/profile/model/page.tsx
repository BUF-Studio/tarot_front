import ModelPage from "./components/model-page";
import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import type { User } from "@/app/lib/definition";
import { redirect } from "next/navigation";
import { getData } from "@/app/actions";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ModelPageWrapper() {
  const user = await authenticatedUser();
  if (!user) {
    redirect("/signin");
  }

  let userData: User | undefined = await getData(user.userId);

  if (!userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModelPage initialUserData={userData} userId={user.userId} />
    </Suspense>
  );
}
