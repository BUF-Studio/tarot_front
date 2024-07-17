import {
  type AuthUser,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }

        const user = {
            ...(await getCurrentUser()),
            ...(await fetchUserAttributes()),
            isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        user.isAdmin = Array.isArray(groups) && groups.includes("Admin");
        setUser(user);
      } catch (error) {
        console.error("Error fetching authenticated user", error);
      }
    }

    fetchUser();
  }, []);

  return user;
}
