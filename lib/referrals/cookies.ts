import { cookies } from "next/headers";

export async function getReferralCode() {
  const cookieStore = await cookies();

  return cookieStore.get("apex_referral_code")?.value ?? null;
}

export async function hasReferralCode() {
  const code = await getReferralCode();

  return !!code;
}