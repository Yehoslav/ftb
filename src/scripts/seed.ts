import { migrateData } from "./migrate-data.ts";
import { migrateWp } from "./migrate-wp.ts";

async function seed(): Promise<void> {
    console.log("=== Seed: migrare WordPress → Turso ===");
    const wp = await migrateWp();
    console.log("=== Seed: migrare date hardcodate → Turso ===");
    const data = await migrateData();
    console.log("=== Seed complet ===", { wp, data });
}

seed().catch((err) => {
    console.error("Seed a eșuat:", err);
    process.exit(1);
});
