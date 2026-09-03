import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { type Project, projects } from "../schema";
import type { ProiectEditie, ProiectHub } from "$lib/data/proiecte";

export function toProiectHub(row: Project): ProiectHub {
    return {
        slug: row.slug,
        titlu: row.titlu,
        categorie: row.categorie ?? "anuale",
        descriere: row.descriere,
        imagine: row.imagine ?? undefined,
        culoare: row.culoare ?? "",
        domenii: row.domenii,
        website: row.website ?? undefined,
        proiectParinteSlug: row.proiectParinteSlug ?? undefined,
    };
}

export function toProiectEditie(row: Project): ProiectEditie {
    return {
        slug: row.slug,
        titlu: row.titlu,
        an: row.an ?? 0,
        proiectSlug: row.proiectSlug ?? "",
        perioada: row.perioada ?? "",
        descriere: row.descriere,
        finantator: row.finantator ?? undefined,
        activitati: row.activitati,
        beneficiari: row.beneficiari ?? undefined,
        voluntari: row.voluntari ?? undefined,
        parteneri: row.parteneri ?? undefined,
        imagine: row.imagine ?? undefined,
        galerie: row.galerie,
        statistici: row.statistici,
        materiale: row.materiale,
        stare: row.stare ?? "planificat",
        registrationUrl: row.registrationUrl ?? undefined,
    };
}

export async function getPublishedHubs(): Promise<ProiectHub[]> {
    const rows = await db.select().from(projects).where(
        and(eq(projects.status, "published"), eq(projects.type, "hub")),
    ).orderBy(projects.id);
    return rows.map(toProiectHub);
}

export async function getPublishedEditions(): Promise<ProiectEditie[]> {
    const rows = await db.select().from(projects).where(
        and(eq(projects.status, "published"), eq(projects.type, "edition")),
    ).orderBy(projects.id);
    return rows.map(toProiectEditie);
}

export async function getPublishedHubBySlug(
    slug: string,
): Promise<ProiectHub | null> {
    const [row] = await db
        .select()
        .from(projects)
        .where(
            and(
                eq(projects.status, "published"),
                eq(projects.slug, slug),
                eq(projects.type, "hub"),
            ),
        );
    return row ? toProiectHub(row) : null;
}

export async function getPublishedEditionsForHub(
    hubSlug: string,
): Promise<ProiectEditie[]> {
    const rows = await db
        .select()
        .from(projects)
        .where(
            and(
                eq(projects.status, "published"),
                eq(projects.type, "edition"),
                eq(projects.proiectSlug, hubSlug),
            ),
        )
        .orderBy(projects.id);
    return rows.map(toProiectEditie).sort((a, b) => b.an - a.an);
}

export async function getCurrentEdition(
    hubSlug: string,
): Promise<ProiectEditie | null> {
    const editii = await getPublishedEditionsForHub(hubSlug);
    return (
        editii.find((e) => e.stare === "in-desfasurare") ??
            editii.find((e) => e.stare === "planificat") ??
            editii[0] ??
            null
    );
}

export async function getPublishedEditionBySlug(
    hubSlug: string,
    editionSlug: string,
): Promise<ProiectEditie | null> {
    const [row] = await db
        .select()
        .from(projects)
        .where(
            and(
                eq(projects.status, "published"),
                eq(projects.type, "edition"),
                eq(projects.proiectSlug, hubSlug),
                eq(projects.slug, editionSlug),
            ),
        );
    return row ? toProiectEditie(row) : null;
}

export async function getPublishedSubprojects(
    hubSlug: string,
): Promise<ProiectHub[]> {
    const rows = await db
        .select()
        .from(projects)
        .where(
            and(
                eq(projects.status, "published"),
                eq(projects.type, "hub"),
                eq(projects.proiectParinteSlug, hubSlug),
            ),
        )
        .orderBy(projects.id);
    return rows.map(toProiectHub);
}

export async function getPublishedProjectFamilySlugs(
    hubSlug: string,
): Promise<string[]> {
    const rows = await db
        .select({ slug: projects.slug, parinte: projects.proiectParinteSlug })
        .from(projects)
        .where(and(eq(projects.status, "published"), eq(projects.type, "hub")));
    const rezultat = [hubSlug];
    let crescut = true;
    while (crescut) {
        crescut = false;
        for (const row of rows) {
            if (
                row.parinte && rezultat.includes(row.parinte) &&
                !rezultat.includes(row.slug)
            ) {
                rezultat.push(row.slug);
                crescut = true;
            }
        }
    }
    return rezultat;
}

export async function getHubSlugsByFamily(
    familySlugs: string[],
): Promise<ProiectHub[]> {
    if (familySlugs.length === 0) return [];
    const rows = await db
        .select()
        .from(projects)
        .where(
            and(
                eq(projects.status, "published"),
                eq(projects.type, "hub"),
                inArray(projects.slug, familySlugs),
            ),
        )
        .orderBy(projects.id);
    return rows.map(toProiectHub);
}
