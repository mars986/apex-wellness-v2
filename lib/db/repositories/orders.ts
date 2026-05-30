export type CreateOrderInput = {
  orderId: string;
  customerId: string;
  providerId: string;
  referralCodeId: string;
  stripeCheckoutSessionId: string;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
};

export async function createOrder(db: D1Database, input: CreateOrderInput) {
  return await db
    .prepare(`
      INSERT INTO orders (
        id,
        customer_id,
        provider_id,
        referral_code_id,
        stripe_checkout_session_id,
        subtotal_cents,
        discount_cents,
        total_cents,
        payment_status,
        order_status,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())
    `)
    .bind(
      input.orderId,
      input.customerId,
      input.providerId,
      input.referralCodeId,
      input.stripeCheckoutSessionId,
      input.subtotalCents,
      input.discountCents,
      input.totalCents,
      "approved",
      "paid"
    )
    .run();
}

export async function getOrders(db: D1Database) {
  return await db
    .prepare(`
      SELECT *
      FROM orders
      ORDER BY created_at DESC
    `)
    .all();
}