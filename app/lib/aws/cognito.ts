"use client";

import { z } from "zod";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
  getCurrentUser,
  confirmResetPassword,
  resetPassword,
  type SignUpOutput
} from "aws-amplify/auth";
import { SignupSchema } from "@/app/_utils/validation";
import { redirect } from "next/navigation";
import { handleSignUpStep } from "./signUpUtils";

type AuthResult = {
  success: boolean;
  message?: string;
  userId?: string;
  error?: string;
};

export async function handleGetCurrentUser() {
  try {
    return await getCurrentUser();
  } catch (error) {
    console.error("Error getting current user", error);
    return null;
  }
}

export async function handleSignUp(formData: FormData): Promise<AuthResult> {
  try {
    const validatedData = validateFormData(formData);
    const { nextStep, userId } = await signUp({
      username: validatedData.email,
      password: validatedData.password,
      options: {
        userAttributes: { email: validatedData.email },
        autoSignIn: true,
      },
    });
    console.log(`User ID: ${userId}`);
    await handleSignUpStep(nextStep, userId);
    return { success: true, userId };
  } catch (error) {
    console.error("Error during sign up:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred during sign up"
    };
  }
}

export async function handleConfirmSignUp(username: string, formData: FormData): Promise<AuthResult> {
  try {
    const { nextStep, userId } = await confirmSignUp({
      username,
      confirmationCode: String(formData.get("code")),
    });
    await handleSignUpStep(nextStep, userId);
    return { success: true, message: "Verification successful", userId };
  } catch (error) {
    console.error("Error during confirmation:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred during confirmation"
    };
  }
}

export async function handleSendEmailVerificationCode(email: string): Promise<AuthResult> {
  try {
    await resendSignUpCode({ username: email });
    return { success: true, message: "Verification code sent" };
  } catch (error) {
    console.error("Error sending verification code:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred while sending verification code"
    };
  }
}

export async function handleSignIn(formData: FormData): Promise<AuthResult> {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      return { success: false, message: "Please verify your email address" };
    }
    return { success: true, message: "Sign in successful" };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred during sign in"
    };
  }
}

export async function handleSignOut(): Promise<void> {
  try {
    await signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export async function handleResetPassword(email: string): Promise<AuthResult> {
  try {
    await resetPassword({ username: email });
    return {
      success: true,
      message: "A verification code has been sent to your email address.",
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred while resetting password"
    };
  }
}

export async function handleConfirmResetPassword(
  username: string,
  confirmationCode: string,
  newPassword: string
): Promise<AuthResult> {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error("Error confirming password reset:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred while confirming password reset"
    };
  }
}

function validateFormData(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  return SignupSchema.parse(rawFormData);
}