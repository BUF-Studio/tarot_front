import { confirmSignUp } from "aws-amplify/auth/cognito";
import { handleSignUpStep } from "./signUpUtils";

// handleConfirmSignUp.ts
export async function handleConfirmSignUp(username: string, formData: FormData) {
  try {
    const { nextStep, userId } = await confirmSignUp({
      username,
      confirmationCode: String(formData.get("code")),
    });

    handleSignUpStep(nextStep, userId);
  } catch (error) {
    console.log(error);
  }
}
