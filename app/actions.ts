"use server";

import {
  Gender,
  Model,
  SubscriptionType,
  User,
} from "@/app/lib/definition";
import { revalidatePath } from "next/cache";

/**
 * Fetches data for a user
 * @param userId - The id of the user to fetch data for
 * @returns A promise that resolves to the user's data
 */
export async function getData(userId: string): Promise<User | undefined> {
  if (userId == "") {
    return undefined;
  }

  const res = await fetch(
    `${process.env.PROTOCOL}://${
      process.env.BACKEND_URL
    }/user?userId=${encodeURIComponent(userId)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

/**
 * Updates the user's model
 * @param formData - The form data containing the user's model
 * @returns A promise that resolves to the result of the update
 * @throws An error if the form data is invalid or the update fails
 */
export async function updateModel(formData: FormData) {
  const model = formData.get("model-group") as Model;
  const userId = formData.get("userId") as string;

  if (!model || !userId) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(
      `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/updateUserModel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, model }),
      }
    );
    revalidatePath("/profile/model");

    if (!response.ok) {
      throw new Error("Failed to update model");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating model:", error);
    return { success: false, error: "Failed to update model" };
  }
}

/**
 * Update the user's profile.
 * @param formData
 * @returns
 * @throws An error if the form data is invalid or the update fails
 */
export async function updateProfile(formData: FormData) {
  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const phone_number = formData.get("phone_number") as string;
  const age = formData.get("age") as string;
  const gender = formData.get("gender") as Gender;

  console.log(`User Id: ${userId}`);
  console.log(`Username: ${username}`);
  console.log(`Phone Number: ${phone_number}`);
  console.log(`Age: ${age}`);
  console.log(`Gender: ${gender}`);

  if (!userId || !username || !phone_number || !age || !gender) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(
      `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          username,
          phone_number,
          age: Number.parseInt(age),
          gender,
        }),
      }
    );
    revalidatePath("/profile");

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

/**
 * Creates a new user.
 * @param formData
 * @returns
 * @throws An error if the form data is invalid or the creation fails
 */
export async function createUser(formData: FormData) {
  try {
    const userData: Partial<User> = {
      id: formData.get("id") as string,
      name: formData.get("username") as string,
      email: formData.get("email") as string,
      phone_number: formData.get("phone_number") as string,
      age: Number.parseInt(formData.get("age") as string),
      gender: formData.get("gender") as Gender,
      model: Model.GPT4OMini,
    };

    // Validate the userData
    const requiredFields: (keyof User)[] = [
      "id",
      "name",
      "email",
      "phone_number",
      "age",
      "gender",
    ];

    console.log("user data is ", userData);
    for (const field of requiredFields) {
      if (
        !(field in userData) ||
        userData[field] === undefined ||
        userData[field] === ""
      ) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const response = await fetch(
      `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    const createdUser = await response.json();
    return { success: true, user: createdUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

/**
 * Update the user's subscription plan.
 * @param userId
 * @param planId
 * @param duration
 * @returns
 * @throws An error if the form data is invalid or the update fails
 */

export async function updateUserSubscription(
  userId: string,
  plan: SubscriptionType,
  durationMonths: number
) {
  try {
    // Validate input
    if (!userId || !plan || !durationMonths) {
      throw new Error("Missing required parameters");
    }

    if (plan !== "free" && plan !== "premium") {
      throw new Error('Invalid plan type. Must be "free" or "premium".');
    }

    // Make a POST request to your backend API
    const response = await fetch(
      `${process.env.API_URL}/updateUserSubscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          plan: plan,
          duration: durationMonths,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update subscription");
    }

    // Revalidate the user's profile page or any other relevant pages
    revalidatePath(`/profile/${userId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
