import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { serverAuthConfig } from "../amplify-server-cognito-configuration";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: serverAuthConfig,
  },
});

export const cookiesClient = generateServerClientUsingCookies({
  config: { Auth: serverAuthConfig },
  cookies,
});

export async function authenticatedUser() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}
