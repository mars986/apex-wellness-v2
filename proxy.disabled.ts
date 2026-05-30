import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const referralCode = request.nextUrl.searchParams.get("r");

  if (!referralCode) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  response.cookies.set("apex_referral_code", referralCode.trim().toUpperCase(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};