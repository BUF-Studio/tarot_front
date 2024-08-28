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
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (user) {
    // If user is authenticated and tries to access a public route, redirect to home
    // Exception: Allow access to /profile-info and /signup/verification even if authenticated
    if (isPublicRoute && !["/profile-info", "/signup/verification"].some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If user is not authenticated and tries to access a protected route, redirect to signin
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};