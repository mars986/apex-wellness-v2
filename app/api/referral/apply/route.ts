import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const formData = await request.formData();
  const code = String(formData.get("code") || "").trim().toUpperCase();

  if (!code) {
    redirect("/account/referral?error=missing_code");
  }

  if (code !== "DRSMITH15") {
    redirect("/account/referral?error=invalid_code");
  }

  console.log("Referral code applied:", {
    user: session.email,
    code,
    providerId: "prov_001",
    discountPercent: 15,
  });

  redirect("/account?referral=applied");
}
