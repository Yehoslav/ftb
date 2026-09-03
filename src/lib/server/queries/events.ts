import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { type Event, events } from "../schema";
import type { Eveniment } from "$lib/data/evenimente";
import { getPublishedProjectFamilySlugs } from "./projects";

export function toEveniment(row: Event): Eveniment {
    return {
        slug: row.slug,
        title: row.title,
        date: row.date,
        dateEnd: row.dateEnd ?? undefined,
        location: row.location,
        description: row.description,
        image: row.image ?? undefined,
        proiectSlug: row.proiectSlug ?? undefined,
        proiectEditieSlug: row.proiectEditieSlug ?? undefined,
        duration: row.duration ?? undefined,
        financedBy: row.financedByLabel && row.financedByUrl
            ? { label: row.financedByLabel, url: row.financedByUrl }
            : undefined,
        activities: row.activities,
        stats: row.stats,
        gallery: row.gallery,
        email: row.email,
        phone: row.phone,
        registrationUrl: row.registrationUrl ?? undefined,
    };
}

export async function getPublishedEvents(): Promise<Eveniment[]> {
    const rows = await db.select().from(events).where(
        eq(events.status, "published"),
    );
    return rows.map(toEveniment);
}

export async function getEventBySlug(slug: string): Promise<Eveniment | null> {
    const [row] = await db
        .select()
        .from(events)
        .where(eq(events.slug, slug));
    return row ? toEveniment(row) : null;
}

export async function getEventsForProject(
    hubSlug: string,
): Promise<Eveniment[]> {
    const familySlugs = await getPublishedProjectFamilySlugs(hubSlug);
    const rows = await db
        .select()
        .from(events)
        .where(
            and(
                eq(events.status, "published"),
                inArray(events.proiectSlug, familySlugs),
            ),
        )
        .orderBy(events.id);
    return rows.map(toEveniment);
}
