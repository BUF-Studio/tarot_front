"use server";

import { autoSignIn, type SignUpOutput } from "aws-amplify/auth/cognito";
import { redirect } from "next/navigation";

export async function handleSignUpStep(
  step: SignUpOutput["nextStep"],
  userId?: string
): Promise<void> {
  switch (step.signUpStep) {
    case "CONFIRM_SIGN_UP":
      console.log("The user should go to confirm Sign Up");
      redirect(`/signup/verification?userId=${userId}`);
      break;
    case "COMPLETE_AUTO_SIGN_IN":
      if (step.codeDeliveryDetails) {
        console.log("The user should go to confirm sign-up");
        redirect(`/signup/verification?userId=${userId}`);
      } else {
        try {
          await autoSignIn();
          console.log("The user should successfully Sign-In now");
          redirect("/personal-info");
        } catch (error) {
          console.error("Error during auto sign-in:", error);
          redirect("/signin");
        }
      }
      break;
    default:
      console.error(`Unexpected sign-up step: ${step.signUpStep}`);
      redirect("/signin");
  }
}