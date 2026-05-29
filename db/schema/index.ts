import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role", { enum: ["customer", "provider", "admin"] }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const providers = sqliteTable("providers", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  displayName: text("display_name").notNull(),
  businessName: text("business_name"),
  status: text("status", { enum: ["pending", "approved", "suspended"] }).notNull().default("pending"),
  commissionPercent: real("commission_percent").notNull().default(15),
  payoutMethod: text("payout_method", { enum: ["ach", "cashapp"] }),
  payoutHandle: text("payout_handle"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const referralCodes = sqliteTable("referral_codes", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull().references(() => providers.id),
  code: text("code").notNull().unique(),
  discountPercent: real("discount_percent").notNull().default(15),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  providerId: text("provider_id").references(() => providers.id),
  referralCodeId: text("referral_code_id").references(() => referralCodes.id),
  lifetimeDiscountPercent: real("lifetime_discount_percent").notNull().default(15),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle"),
  category: text("category").notNull(),
  strength: text("strength"),
  activeIngredients: text("active_ingredients", { mode: "json" }).notNull(),
  shortDescription: text("short_description").notNull(),
  usageInformation: text("usage_information").notNull(),
  reconstitutionInstructions: text("reconstitution_instructions", { mode: "json" }).notNull(),
  storageInformation: text("storage_information", { mode: "json" }).notNull(),
  enhancedStability: text("enhanced_stability").notNull(),
  requiresProviderReferral: integer("requires_provider_referral", { mode: "boolean" }).notNull().default(true),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const productVariants = sqliteTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id),
  name: text("name").notNull(),
  priceCents: integer("price_cents").notNull(),
  inventoryQuantity: integer("inventory_quantity").notNull().default(0),
  allowPreorder: integer("allow_preorder", { mode: "boolean" }).notNull().default(true),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  providerId: text("provider_id").notNull().references(() => providers.id),
  referralCodeId: text("referral_code_id").notNull().references(() => referralCodes.id),
  stripeCheckoutSessionId: text("stripe_checkout_session_id").unique(),
  subtotalCents: integer("subtotal_cents").notNull(),
  discountCents: integer("discount_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  paymentStatus: text("payment_status", { enum: ["pending", "approved", "failed", "refunded"] }).notNull().default("pending"),
  orderStatus: text("order_status", { enum: ["pending", "paid", "processing", "fulfilled", "cancelled"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  productId: text("product_id").notNull().references(() => products.id),
  variantId: text("variant_id").notNull().references(() => productVariants.id),
  productName: text("product_name").notNull(),
  variantName: text("variant_name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
});

export const commissions = sqliteTable("commissions", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull().references(() => providers.id),
  orderId: text("order_id").notNull().references(() => orders.id),
  commissionPercent: real("commission_percent").notNull(),
  baseCents: integer("base_cents").notNull(),
  amountCents: integer("amount_cents").notNull(),
  status: text("status", { enum: ["pending", "payable", "paid", "voided"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const payouts = sqliteTable("payouts", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull().references(() => providers.id),
  amountCents: integer("amount_cents").notNull(),
  method: text("method", { enum: ["ach", "cashapp"] }).notNull(),
  status: text("status", { enum: ["requested", "queued", "paid", "rejected"] }).notNull().default("requested"),
  requestedByProvider: integer("requested_by_provider", { mode: "boolean" }).notNull().default(false),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const magicLinks = sqliteTable("magic_links", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  role: text("role", { enum: ["customer", "provider"] }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  usedAt: integer("used_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const marketingAssets = sqliteTable("marketing_assets", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").references(() => providers.id),
  title: text("title").notNull(),
  type: text("type", { enum: ["image", "pdf", "qr", "copy"] }).notNull(),
  fileUrl: text("file_url"),
  body: text("body"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadata: text("metadata", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
