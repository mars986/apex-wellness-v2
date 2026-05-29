export type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  category: string;
  strength: string | null;
  shortDescription: string;
};

export async function getActiveProducts(
  db: D1Database
): Promise<ProductListItem[]> {
  const result = await db
    .prepare(`
      SELECT
        id,
        name,
        slug,
        subtitle,
        category,
        strength,
        short_description as shortDescription
      FROM products
      WHERE active = 1
      ORDER BY name ASC
    `)
    .all<ProductListItem>();

  return result.results || [];
}
