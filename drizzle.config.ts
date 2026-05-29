import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: "6ac9a9b1-3ac7-4a53-b3b5-2cde834150ed",
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
} satisfies Config;
