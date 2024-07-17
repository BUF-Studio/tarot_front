import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/_utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isAuthenticatedArea = request.nextUrl.pathname.startsWith("/");

  if (!user && isAuthenticatedArea) {
    return NextResponse.redirect("/signin");
  }

  return request;
}

export const config = {
    matcher: [],
};