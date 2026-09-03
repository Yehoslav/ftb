import { asc } from "drizzle-orm";
import { db } from "../db";
import { type Member, members, team, type TeamMember } from "../schema";
import type { Membru } from "$lib/data/membre";
import type { MembruEchipa } from "$lib/data/echipa";

export function toMembru(row: Member): Membru {
    return {
        abreviere: row.abreviere,
        nume: row.nume,
        numeJuridic: row.numeJuridic,
        oras: row.oras,
        judet: row.judet,
        adresa: row.adresa ?? undefined,
        dataInfiintarii: row.dataInfiintarii ?? undefined,
        presedinte: row.presedinte ?? undefined,
        telefon: row.telefon ?? undefined,
        email: row.email ?? undefined,
        logo: row.logo ?? undefined,
        socialLinks: row.socialLinks,
        categorii: row.categorii,
    };
}

export function toMembruEchipa(row: TeamMember): MembruEchipa {
    return {
        nume: row.nume,
        rol: row.rol,
        categorie: row.categorie,
        foto: row.foto ?? undefined,
        descriere: row.descriere ?? undefined,
        oras: row.oras ?? undefined,
        email: row.email ?? undefined,
        socials: row.socials.length ? row.socials : undefined,
    };
}

export async function getMembri(): Promise<Membru[]> {
    const rows = await db.select().from(members).orderBy(
        asc(members.ordine),
        asc(members.id),
    );
    return rows.map(toMembru);
}

export async function getEchipa(): Promise<MembruEchipa[]> {
    const rows = await db.select().from(team).orderBy(
        asc(team.ordine),
        asc(team.id),
    );
    return rows.map(toMembruEchipa);
}
