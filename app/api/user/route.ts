import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/user?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = errorText
        ? JSON.parse(errorText)
        : { message: "Unknown error" };
      return NextResponse.json(
        { error: errorData.message || "Failed to get user" },
        { status: response.status }
      );
    }

    const responseBody = await response.text();

    if (responseBody) {
      const userData = JSON.parse(responseBody);
      return NextResponse.json({ data: userData });
    }

    return NextResponse.json({ data: null });
  } catch (error) {
    console.error("Error in User route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}