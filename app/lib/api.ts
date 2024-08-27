export async function createUser(userData: {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  age: number;
  gender: string;
}) {
  console.log(userData);
  const response = await fetch("http://127.0.0.1:5000/createUser", {
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

  return response.json();
}

export async function getUser(userId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/getUser?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text(); // Get response as text
      const errorData = errorText
        ? JSON.parse(errorText)
        : { message: "Unknown error" };
      throw new Error(errorData.message || "Failed to get user");
    }

    const responseBody = await response.text(); // Get response as text

    if (responseBody) {
      return JSON.parse(responseBody); // Parse response as JSON if not empty
    }
    return null; // Handle empty response if needed
  } catch (error) {
    console.error("Error in getUser server action:", error);
    throw error;
  }
}
