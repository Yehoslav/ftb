import { type Client, createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let _client: Client | null = null;

export function getClient(): Client {
    if (!_client) {
        const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
        const authToken = process.env.TURSO_AUTH_TOKEN;
        _client = createClient(authToken ? { url, authToken } : { url });
    }
    return _client;
}

export const db = drizzle(getClient(), { schema });

export { schema };
