export type CreateCommissionInput = {
  id: string;
  providerId: string;
  orderId: string;
  commissionPercent: number;
  baseCents: number;
  amountCents: number;
};

export async function createCommission(
  db: D1Database,
  input: CreateCommissionInput
) {
  return await db
    .prepare(`
      INSERT INTO commissions (
        id,
        provider_id,
        order_id,
        commission_percent,
        base_cents,
        amount_cents,
        status,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())
    `)
    .bind(
      input.id,
      input.providerId,
      input.orderId,
      input.commissionPercent,
      input.baseCents,
      input.amountCents,
      "pending"
    )
    .run();
}