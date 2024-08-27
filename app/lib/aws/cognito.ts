"use server";

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
} from "aws-amplify/auth";
import { getErrorMessage } from "@/app/_utils/get-error-message";
import { SignupSchema } from "@/app/_utils/validation";

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
    const { userId } = await signUp({
      username: validatedData.email,
      password: validatedData.password,
      options: {
        userAttributes: {
          email: validatedData.email,
        },
        autoSignIn: true
      },
    });
    return { success: true, userId };
  } catch (error) {
    return handleAuthError(error, "signup");
  }
}

export async function handleConfirmSignUp(
  email: string,
  formData: FormData
): Promise<AuthResult> {
  try {
    if (!email) {
      throw new Error("Email not found. Please sign up again.");
    }
    const { isSignUpComplete, nextStep, userId } = await confirmSignUp({
      username: email,
      confirmationCode: String(formData.get("code")),
    });
    await autoSignIn();
    console.log(
      `Is sign up complete: ${isSignUpComplete} Next step: ${nextStep.signUpStep} User: ${userId}`
    );
    return { success: true, message: "Verification successful", userId };
  } catch (error) {
    if (
      getErrorMessage(error) ===
      "User cannot be confirmed. Current status is CONFIRMED"
    ) {
      return { success: true, message: "User has been VERIFIED" };
    }
    return handleAuthError(error, "email verification");
  }
}

export async function handleSendEmailVerificationCode(
  email: string
): Promise<AuthResult> {
  try {
    await resendSignUpCode({ username: email });
    return { success: true, message: "Verification code sent" };
  } catch (error) {
    return handleAuthError(error, "sending verification code");
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
    return handleAuthError(error, "sign in");
  }
}

export async function handleSignOut(): Promise<void> {
  try {
    await signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out", error);
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
    return handleAuthError(error, "resetting password");
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
    return handleAuthError(error, "confirming password reset");
  }
}

// Helper functions

function validateFormData(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  return SignupSchema.parse(rawFormData);
}

async function performSignUp(validatedData: z.infer<typeof SignupSchema>) {
  return await signUp({
    username: validatedData.email,
    password: validatedData.password,
    options: {
      userAttributes: {
        email: validatedData.email,
      },
      // Optional
      autoSignIn: false,
    },
  });
}

function handleAuthError(error: unknown, context: string): AuthResult {
  console.error(`Error during ${context}:`, error);

  if (error instanceof z.ZodError) {
    return { success: false, error: error.errors[0].message };
  }

  if (error instanceof Error) {
    const errorMessage = getCognitoErrorMessage(error.name);
    if (errorMessage) {
      return { success: false, error: errorMessage };
    }
  }

  return {
    success: false,
    error: `An unexpected error occurred during ${context}`,
  };
}

function getCognitoErrorMessage(errorName: string): string | null {
  const errorMessages: Record<string, string> = {
    UsernameExistsException: "An account with this email already exists",
    InvalidPasswordException:
      "Password does not meet the requirements set by your admin",
    InvalidParameterException: "Invalid Parameters",
    CodeDeliveryFailureException:
      "Failed to send verification code. Please try again",
    LimitExceededException: "Attempt limit exceeded, please try again later",
    TooManyRequestsException: "Too many requests, please try again later",
  };

  return errorMessages[errorName] || null;
}
