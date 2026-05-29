export type ReferralCodeRecord = {
  referralCodeId: string;
  providerId: string;
  code: string;
  discountPercent: number;
  active: number;
  providerStatus: string;
};

export async function getReferralCodeByCode(
  db: D1Database,
  code: string
): Promise<ReferralCodeRecord | null> {
  return await db
    .prepare(`
      SELECT
        referral_codes.id as referralCodeId,
        referral_codes.provider_id as providerId,
        referral_codes.code,
        referral_codes.discount_percent as discountPercent,
        referral_codes.active,
        providers.status as providerStatus
      FROM referral_codes
      JOIN providers ON providers.id = referral_codes.provider_id
      WHERE referral_codes.code = ?
      LIMIT 1
    `)
    .bind(code.toUpperCase())
    .first<ReferralCodeRecord>();
}

export async function validateReferralCode(db: D1Database, code: string) {
  const referral = await getReferralCodeByCode(db, code);

  if (!referral) return null;
  if (!referral.active) return null;
  if (referral.providerStatus !== "approved") return null;

  return referral;
}
