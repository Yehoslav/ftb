import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
    dialect: "turso",
    schema: "./src/lib/server/schema.ts",
    out: "./drizzle",
    dbCredentials: authToken ? { url, authToken } : { url },
    strict: true,
    verbose: true,
});
