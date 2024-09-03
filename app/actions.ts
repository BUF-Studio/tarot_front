"use server";

import { Gender, Model, User } from "@/app/lib/definition";
import { revalidatePath } from "next/cache";

export async function getData(userId: string): Promise<User> {
    const res = await fetch(
      `http://${process.env.BACKEND_URL}/user?userId=${encodeURIComponent(userId)}`,
      { cache: "no-store" }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

export async function updateModel(formData: FormData) {
  const model = formData.get("model-group") as Model;
  const userId = formData.get("userId") as string;

  if (!model || !userId) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(
      `http://${process.env.BACKEND_URL}/updateUserModel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, model }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update model");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating model:", error);
    return { success: false, error: "Failed to update model" };
  }
}

export async function updateProfile(formData: FormData) {
  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const phone_number = formData.get("phone") as string;
  const age = formData.get("age") as string;
  const gender = formData.get("gender") as Gender;

  if (!userId || !username || !phone_number || !age || !gender) {
    throw new Error("Invalid form data");
  }

  try {
    const response = await fetch(
      `http://${process.env.BACKEND_URL}/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          username,
          phone_number,
          age: parseInt(age),
          gender,
        }),
      }
    );
    revalidatePath('/profile');


    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function createUser(formData: FormData) {
    try {
      const userData: Partial<User> = {
        id: formData.get('id') as string,
        name: formData.get('username') as string,
        email: formData.get('email') as string,
        phone_number: formData.get('phone_number') as string,
        age: parseInt(formData.get('age') as string),
        gender: formData.get('gender') as Gender,
      };
  
      // Validate the userData
      const requiredFields: (keyof User)[] = ['id', 'name', 'email', 'phone_number', 'age', 'gender'];
      for (const field of requiredFields) {
        if (!(field in userData) || userData[field] === undefined || userData[field] === '') {
          throw new Error(`Missing required field: ${field}`);
        }
      }
  
      const response = await fetch(`http://${process.env.BACKEND_URL}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
  
      const createdUser = await response.json();
      return { success: true, user: createdUser };
  
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error: error instanceof Error ? error.message : "Failed to create user" };
    }
  }