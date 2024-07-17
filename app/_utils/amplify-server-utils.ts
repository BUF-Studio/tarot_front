import { authConfig } from "@/app/amplify-cognito-config";
import { type NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const {runWithAmplifyServerContext} = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const user = {
            ...(await getCurrentUser(contextSpec)),
            isAdmin: false,
        }
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        user.isAdmin = Array.isArray(groups) && groups.includes("Admin");

        return user;
      } catch (error) {
        console.error("Error fetching authenticated user", error);
      }
    },
  });
}