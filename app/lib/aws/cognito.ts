import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
} from "aws-amplify/auth";

export async function handleSignUp(formData: FormData) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          phone_number: String(formData.get("phone")),
        },
        autoSignIn: true,
      },
    });
    console.log("User ID", userId);
    console.log("Is sign up complete", isSignUpComplete);
    console.log("Next step", nextStep);
  } catch (error) {
    console.error("Error signing up user", error);
    // Handle error (e.g., show error message to the user)
  }
  // redirect("/confirm-signup");
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
    console.log(`Is sign up complete: ${isSignUpComplete} Next step: ${nextStep}`);
    autoSignIn();
  } catch (error) {
    console.error("Error confirming sign up", error);
    // Handle error (e.g., show error message to the user)
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    return { ...prevState, message: "Verification code sent", errorMessage: "" };
  } catch (error) {
    console.error("Error sending email verification code", error);
    return { ...prevState, errorMessage: error };
  }
}

export async function handleSignIn(
  formData: FormData
) {
  let redirectPath = "/";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep === 'CONFIRM_SIGN_UP') {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectPath = "/confirm-signup";
    }
    redirect(redirectPath);
  } catch (error) {
    console.error("Error signing in", error);
    // Handle error (e.g., show error message to the user)
    redirect("/signin");
  }
}

export async function handleSignOut() {
  try {
    await signOut();
    redirect("/signin");
  } catch (error) {
    console.error("Error signing out", error);
    // Handle error (e.g., show error message to the user)
  }
}
