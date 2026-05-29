import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth/session";

function getSecret() {
  const secret = process.env.AUTH_SECRET || "dev-only-change-me";
  return new TextEncoder().encode(secret);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = String(payload.email || "").toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "invalid_email_payload" }, { status: 400 });
    }

    const role =
      email === process.env.ADMIN_EMAIL?.toLowerCase()
        ? "admin"
        : "customer";

    await setSession({
      id: email,
      email,
      role,
    });

    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/account", request.url)
    );
  } catch (error) {
    console.error("MAGIC VERIFY ERROR:", error);
    return NextResponse.json(
      { error: "expired_or_invalid", detail: String(error) },
      { status: 400 }
    );
  }
}
