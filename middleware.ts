import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/_utils/amplify-server-utils";
import { getUser } from "./app/lib/api";
import { clearNeedsDbCheckCookie } from "./app/_utils/cookieManager";

// Define public routes
const publicRoutes = [
  "/signin",
  "/create-account1",
  "/create-account2",
  "/forgot-password",
  "/confirm-signup",
  "/signup",
  "/signup/account-setup",
];

// Define routes that require a database check
const dbRequiredRoutes = ["/", "/profile", "/settings"]; // Add more routes as needed

function isDynamicPublicRoute(pathname: string): boolean {
  if (pathname.startsWith("/signup/verification/")) {
    const parts = pathname.split("/");
    return parts.length === 4 && parts[3].length > 0;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    publicRoutes.includes(pathname) || isDynamicPublicRoute(pathname);
  const isDbRequiredRoute = dbRequiredRoutes.includes(pathname);

  if (user) {
    // If user is authenticated and tries to access a public route, redirect to home
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isDbRequiredRoute) {
      const needsDbCheck = request.cookies.get("needsDbCheck")?.value === "true";
      if (needsDbCheck) {
        try {
          const dbUser = await getUser(user.userId);
          if (dbUser) {
            clearNeedsDbCheckCookie();
            return response;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        return NextResponse.redirect(new URL("/profile-info", request.url));
      }
      response.cookies.set("needsDbCheck", "true", {
        maxAge: 3600, // 1 hour expiration
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
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
