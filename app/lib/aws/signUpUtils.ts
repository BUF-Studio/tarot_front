"use server";

import { autoSignIn, type SignUpOutput } from "aws-amplify/auth/cognito";
import { redirect } from "next/navigation";

export async function handleSignUpStep(
  step: SignUpOutput["nextStep"],
  userId?: SignUpOutput["userId"]
): Promise<void> {
  switch (step.signUpStep) {
    case "CONFIRM_SIGN_UP": {
      // Redirect end-user to confirm-sign up screen.
      console.log("The user should go to confirm Sign Up");
      redirect(`/signup/verification?userId=${userId}`);
      break;
    }
    case "COMPLETE_AUTO_SIGN_IN": {
      const codeDeliveryDetails = step.codeDeliveryDetails;
      if (codeDeliveryDetails) {
        // Redirect user to confirm-sign-up with link screen.
        console.log("The user should got to confirm-sign-up");
        redirect(`/signup/verification?userId=${userId}`);
      } else {
        try {
          const signInOutput = await autoSignIn();
          // Handle successful auto sign-in
          console.log("The user should successfully Sign-In now");
          redirect("/personal-info")
        } catch (error) {
          // Handle auto sign-in error
          console.log(`There is some error when sign the user in: ${error}`);
        }
      }
      break;
    }
    
    default: {
      console.error(`Unexpected sign-up step: ${step.signUpStep}`);
      // Handle unexpected step
      redirect("/signin")
      break;
    }
  }
}
