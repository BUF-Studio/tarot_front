import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/_utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const { pathname } = request.nextUrl;

  // Define public routes
  const publicRoutes = [
    "/signin",
    "/create-account1",
    "/create-account2",
    "/forgot-password",
    "/confirm-signup",
  ];

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if the current route is the home page or any other protected route
  const isProtectedRoute =
    pathname === "/" || (!isPublicRoute && pathname !== "/");

  if (user) {
    // If user is authenticated and tries to access a public route, redirect to home
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If user is not authenticated and tries to access a protected route, redirect to signin
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return response;
}

// Optionally, you can specify which routes this middleware should run on:
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
