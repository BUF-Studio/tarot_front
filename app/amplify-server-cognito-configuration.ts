import { type ResourcesConfig } from "aws-amplify";

export const serverAuthConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    signUpVerificationMethod: "code"
  },
};