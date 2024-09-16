// amplify-cognito-config.ts
"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";
import { useEffect } from 'react';

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    signUpVerificationMethod: "code"
  },
};

let isConfigured = false;

export function useAmplifyConfig() {
  useEffect(() => {
    if (!isConfigured) {
      Amplify.configure(
        {
          Auth: authConfig,
        },
        { ssr: true }
      );
      isConfigured = true;
      console.log('Amplify configured');
    }
  }, []);
}

export default function ConfigureAmplifyClientSide() {
  useAmplifyConfig();
  return null;
}