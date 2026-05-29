import { redirect } from "next/navigation";
import { sendMagicLinkEmail } from "@/lib/email";
import { SignJWT } from "jose";

function getSecret() {
  const secret = process.env.AUTH_SECRET || "dev-only-change-me";
  return new TextEncoder().encode(secret);
}

async function createMagicToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    redirect("/auth/login?error=invalid_email");
  }

  const token = await createMagicToken(email);
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const magicLink = `${appUrl}/auth/verify?token=${encodeURIComponent(token)}`;

  await sendMagicLinkEmail(email, magicLink);

  redirect("/auth/check-email");
}
