import { signUp } from "aws-amplify/auth/cognito";
import { handleSignUpStep } from "./signUpUtils";

export async function handleSignUp(formData: FormData) {
  try {
    const { nextStep, userId } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: { email:  String(formData.get("email"))},
        autoSignIn: true,
      },
    });
    console.log(`User ID: ${userId}`)
    handleSignUpStep(nextStep, userId);
  } catch (error) {
    console.log(error);
  }
}
