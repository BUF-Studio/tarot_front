import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/_utils/amplify-server-utils";

// Define public routes
const publicRoutes = [
  "/signin",
  "/create-account1",
  "/create-account2",
  "/forgot-password",
  "/confirm-signup",
  "/signup",
  "/signup/account-setup",
  "/signup/verification",
  "/profile-info",
  "/error",
];

const protectedRoutes = ["/profile", "/payment", "/payment-success"];

async function checkUserRegistration(userId: string) {
  const url = `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/user?userId=${userId}`;
  console.log("URL is ", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      // User not found in the database
      return false;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data !== null && Object.keys(data).length > 0;
  } catch (error) {
    console.error("Error checking user registration:", error);
    throw error;
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser();

  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (user) {
    try {
      console.log("Checking user registration...");
      const isRegistered = await checkUserRegistration(user.userId);

      if (!isRegistered && pathname !== "/profile-info") {
        // User is authenticated but not registered in the backend, redirect to profile info
        return NextResponse.redirect(new URL("/profile-info", request.url));
      }

      // If user is authenticated and tries to access a login or registration route, redirect to home
      if (isPublicRoute && pathname !== "/" && pathname !== "/profile-info") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error checking user registration:", error);
      // If there's an error (including connection errors), redirect to error page
      return NextResponse.redirect(new URL("/error", request.url));
    }
  } else {
    console.log("User is not authenticated");
    // If user is not authenticated and tries to access a protected route, redirect to signin
    // if (isProtectedRoute) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    // Allow access to the landing page and public routes
    if (pathname === "/" || isPublicRoute) {
      return response;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
