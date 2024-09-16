import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  FetchUserAttributesOutput,
  GetCurrentUserOutput
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

// Define a type that combines GetCurrentUserOutput and FetchUserAttributesOutput
type AuthenticatedUser = GetCurrentUserOutput & {
  attributes: FetchUserAttributesOutput;
};

export function useAuthUser() {
  const [user, setUser] = useState<AuthenticatedUser | undefined>(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }

        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();

        // Combine the currentUser and userAttributes correctly
        const authenticatedUser: AuthenticatedUser = {
          ...currentUser,
          attributes: userAttributes
        };

        setUser(authenticatedUser);
      } catch (error) {
        console.error("Error fetching authenticated user", error);
      }
    }

    fetchUser();
  }, []);

  return user;
}