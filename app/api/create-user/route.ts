import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // Validate the userData
    const requiredFields = ['id', 'username', 'email', 'phone_number', 'age', 'gender'];
    for (const field of requiredFields) {
      if (!(field in userData)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log(userData);

    const response = await fetch(`http://${process.env.BACKEND_URL}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create user" },
        { status: response.status }
      );
    }

    const createdUser = await response.json();
    return NextResponse.json(createdUser);

  } catch (error) {
    console.error("Internal Error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}