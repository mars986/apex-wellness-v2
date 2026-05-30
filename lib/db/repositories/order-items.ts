export type CreateOrderItemInput = {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
};

export async function createOrderItem(
  db: D1Database,
  input: CreateOrderItemInput
) {
  return await db
    .prepare(`
      INSERT INTO order_items (
        id,
        order_id,
        product_id,
        variant_id,
        product_name,
        variant_name,
        quantity,
        unit_price_cents,
        total_cents
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      input.id,
      input.orderId,
      input.productId,
      input.variantId,
      input.productName,
      input.variantName,
      input.quantity,
      input.unitPriceCents,
      input.totalCents
    )
    .run();
}