import { redirect } from "next/navigation";
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
import { NextRouter } from "next/router";

export async function handleGetCurrentUser() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Error getting current user", error);
  }
}

export async function handleSignUp(
  email: string,
  phone_number: string,
  preferred_username: string,
  password: string
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email,
          phone_number,
          preferred_username,
        },
        autoSignIn: true,
      },
    });
    console.log("User ID", userId);
    console.log("Is sign up complete", isSignUpComplete);
    console.log("Next step", nextStep);
    return { success: true, message: "Sign up successful" };
  } catch (error) {
    console.error("Error signing up user", error);
    return {
      success: false,
      message: getErrorMessage(error) || "An error occurred during sign up",
    };
  }
}

export async function handleConfirmSignUp(
  email: string,
  verificationCode: string
) {
  try {
    if (!email) {
      throw new Error("Email not found. Please sign up again.");
    }
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: verificationCode,
    });
    console.log(
      `Is sign up complete: ${isSignUpComplete} Next step: ${nextStep}`
    );
    autoSignIn();
    return { success: true, message: "Verification successful" };
  } catch (error) {
    console.error("Error confirming sign up", error);
    // Handle error (e.g., show error message to the user)
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred during email verification",
    };
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  email: string
) {
  try {
    await resendSignUpCode({
      username: email,
    });
    console.log("Verification code sent");
    return {
      ...prevState,
      message: "Verification code sent",
      errorMessage: "",
    };
  } catch (error) {
    console.error("Error sending email verification code", error);
    return { ...prevState, errorMessage: error as string };
  }
}

export async function handleSignIn(formData: FormData) {
  try {
    console.log(`Email: ${String(formData.get("email"))}`);
    console.log(`Password: ${String(formData.get("password"))}`);
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      return { success: false, message: "Please verify your email address" };
    }
    return { success: true, message: "Sign in successful" };
  } catch (error) {
    console.error("Error signing in", error);
    return {
      success: false,
      message: getErrorMessage(error) || "An error occurred during sign in",
    };
  }
}

export async function handleSignOut() {
  try {
    signOut();
    console.log("User signed out");
    // redirect("/signin");
  } catch (error) {
    console.error("Error signing out", error);
    // Handle error (e.g., show error message to the user)
  }
}

export async function handleResetPassword(
  email: string
) {
  try {
    await resetPassword({ username: email });
    return { success: true, message: "A verification code has been send to your email address." };
  } catch (error) {
    console.error("Error resetting password", error);
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred during email verification",
    };
  }
}

export async function handleConfirmResetPassword(
  username: string,
  confirmationCode: string,
  newPassword: string
) {
  try {
    await confirmResetPassword({
      username,
      confirmationCode,
      newPassword,
    });
    return { success: true, message: "Password reset successful" };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred during email verification",
    };
  }
}
