export type ProviderSummary = {
  id: string;
  displayName: string;
  businessName: string | null;
  commissionPercent: number;
  status: string;
};

export async function getProviderByUserId(
  db: D1Database,
  userId: string
): Promise<ProviderSummary | null> {
  return await db
    .prepare(`
      SELECT
        id,
        display_name as displayName,
        business_name as businessName,
        commission_percent as commissionPercent,
        status
      FROM providers
      WHERE user_id = ?
      LIMIT 1
    `)
    .bind(userId)
    .first<ProviderSummary>();
}
