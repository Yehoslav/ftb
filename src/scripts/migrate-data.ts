import { db, schema } from "../lib/server/db.ts";
import {
    events as eventsTable,
    members as membersTable,
    type NewEvent,
    type NewMember,
    type NewProject,
    type NewTeamMember,
    projects as projectsTable,
    team as teamTable,
} from "../lib/server/schema.ts";
import { editii, huburi } from "../lib/data/proiecte.ts";
import { evenimente } from "../lib/data/evenimente.ts";
import { membriFallback } from "../lib/data/membre.ts";
import { echipaFallback } from "../lib/data/echipa.ts";

function upsertSet<T extends object>(
    row: T,
    key: keyof T & string,
): Omit<T, typeof key> {
    const { [key]: _drop, ...rest } = row;
    void _drop;
    return rest as Omit<T, typeof key>;
}

function hubRows(): NewProject[] {
    return huburi.map((h) => ({
        slug: h.slug,
        type: "hub" as const,
        titlu: h.titlu,
        categorie: h.categorie,
        descriere: h.descriere,
        imagine: h.imagine ?? null,
        culoare: h.culoare,
        domenii: h.domenii,
        website: h.website ?? null,
        proiectParinteSlug: h.proiectParinteSlug ?? null,
        status: "published" as const,
    }));
}

function editionRows(): NewProject[] {
    return editii.map((e) => ({
        slug: e.slug,
        type: "edition" as const,
        titlu: e.titlu,
        descriere: e.descriere,
        imagine: e.imagine ?? null,
        culoare: null,
        domenii: [],
        proiectSlug: e.proiectSlug,
        an: e.an,
        perioada: e.perioada,
        finantator: e.finantator ?? null,
        activitati: e.activitati,
        beneficiari: e.beneficiari ?? null,
        voluntari: e.voluntari ?? null,
        parteneri: e.parteneri ?? null,
        galerie: e.galerie,
        statistici: e.statistici,
        materiale: e.materiale,
        stare: e.stare,
        registrationUrl: e.registrationUrl ?? null,
        status: "published" as const,
    }));
}

function eventRows(): NewEvent[] {
    return evenimente.map((e) => ({
        slug: e.slug,
        title: e.title,
        date: e.date,
        dateEnd: e.dateEnd ?? null,
        location: e.location,
        description: e.description,
        content: null,
        image: e.image ?? null,
        proiectSlug: e.proiectSlug ?? null,
        proiectEditieSlug: e.proiectEditieSlug ?? null,
        duration: e.duration ?? null,
        financedByLabel: e.financedBy?.label ?? null,
        financedByUrl: e.financedBy?.url ?? null,
        activities: e.activities,
        stats: e.stats,
        gallery: e.gallery,
        email: e.email,
        phone: e.phone,
        registrationUrl: e.registrationUrl ?? null,
        status: "published" as const,
    }));
}

function memberRows(): NewMember[] {
    return membriFallback.map((m, i) => ({
        abreviere: m.abreviere,
        nume: m.nume,
        numeJuridic: m.numeJuridic,
        oras: m.oras,
        judet: m.judet,
        adresa: m.adresa ?? null,
        dataInfiintarii: m.dataInfiintarii ?? null,
        presedinte: m.presedinte ?? null,
        telefon: m.telefon ?? null,
        email: m.email ?? null,
        logo: m.logo ?? null,
        socialLinks: m.socialLinks ?? {},
        categorii: m.categorii,
        ordine: i,
    }));
}

function teamRows(): NewTeamMember[] {
    return echipaFallback.map((t, i) => ({
        nume: t.nume,
        rol: t.rol,
        categorie: t.categorie,
        foto: t.foto ?? null,
        descriere: t.descriere ?? null,
        oras: t.oras ?? null,
        email: t.email ?? null,
        socials: t.socials ?? [],
        ordine: i,
    }));
}

export async function migrateData(): Promise<
    { projects: number; events: number; members: number; team: number }
> {
    const projects = [...hubRows(), ...editionRows()];
    for (const row of projects) {
        await db
            .insert(projectsTable)
            .values(row)
            .onConflictDoUpdate({
                target: projectsTable.slug,
                set: upsertSet(row, "slug"),
            });
    }
    console.log(`projects migrate: ${projects.length} (hub + ediții)`);

    const events = eventRows();
    for (const row of events) {
        await db
            .insert(eventsTable)
            .values(row)
            .onConflictDoUpdate({
                target: eventsTable.slug,
                set: upsertSet(row, "slug"),
            });
    }
    console.log(`events migrate: ${events.length}`);

    const members = memberRows();
    await db.delete(membersTable);
    await db.insert(membersTable).values(members);
    console.log(`members migrate: ${members.length} (înlocuiți complet)`);

    const team = teamRows();
    await db.delete(teamTable);
    await db.insert(teamTable).values(team);
    console.log(`team migrate: ${team.length} (înlocuiți complet)`);

    return {
        projects: projects.length,
        events: events.length,
        members: members.length,
        team: team.length,
    };
}

if (import.meta.main) {
    migrateData()
        .then((r) => {
            console.log("Gata:", r);
            process.exit(0);
        })
        .catch((err) => {
            console.error("Migrarea datelor a eșuat:", err);
            process.exit(1);
        });
}
