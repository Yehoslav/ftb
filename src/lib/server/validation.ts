import { z } from "zod";

const statusEnum = z.enum(["draft", "published"]);
const slugSchema = z
    .string()
    .min(1)
    .max(120)
    .regex(
        /^[a-z0-9]+(-[a-z0-9]+)*$/,
        "Slug-ul poate conține doar litere mici, cifre și cratime",
    );

export const postCreateSchema = z.object({
    slug: slugSchema.optional(),
    title: z.string().min(1).max(300),
    content: z.string().default(""),
    excerpt: z.string().default(""),
    status: statusEnum.default("draft"),
    category: z.string().default("actualitati"),
    authorId: z.string().nullish(),
    featuredImageUrl: z.string().url().nullish(),
    featuredImageAlt: z.string().nullish(),
    date: z.coerce.date().optional(),
});

export const postUpdateSchema = postCreateSchema.partial().extend({
    featuredImageSrcset: z.string().nullish(),
    featuredImageSizes: z.string().nullish(),
    featuredImageWidth: z.number().int().nullish(),
    featuredImageHeight: z.number().int().nullish(),
});

export const pageCreateSchema = z.object({
    slug: slugSchema.optional(),
    title: z.string().min(1).max(300),
    content: z.string().default(""),
    description: z.string().default(""),
    categorie: z.string().nullish(),
    volatility: z.enum(["timeless", "volatile", "critical"]).nullish(),
    menuOrder: z.number().int().default(0),
    status: statusEnum.default("published"),
    modified: z.coerce.date().nullish(),
});

export const pageUpdateSchema = pageCreateSchema.partial();

export const projectCreateSchema = z.object({
    slug: slugSchema.optional(),
    type: z.enum(["hub", "edition"]),
    titlu: z.string().min(1).max(300),
    categorie: z.enum(["anuale", "singulare"]).nullish(),
    descriere: z.string().default(""),
    imagine: z.string().url().nullish(),
    culoare: z.string().nullish(),
    domenii: z.array(z.string()).default([]),
    website: z.string().url().nullish(),
    proiectSlug: slugSchema.nullish(),
    proiectParinteSlug: slugSchema.nullish(),
    an: z.number().int().nullish(),
    perioada: z.string().nullish(),
    finantator: z.string().nullish(),
    activitati: z.array(z.string()).default([]),
    beneficiari: z.string().nullish(),
    voluntari: z.string().nullish(),
    parteneri: z.string().nullish(),
    galerie: z.array(z.string().url()).default([]),
    statistici: z.array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
    materiale: z.array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    stare: z.enum(["planificat", "in-desfasurare", "finalizat"]).nullish(),
    registrationUrl: z.string().url().nullish(),
    status: statusEnum.default("published"),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export const eventCreateSchema = z.object({
    slug: slugSchema.optional(),
    title: z.string().min(1).max(300),
    date: z.string().min(4).max(10),
    dateEnd: z.string().min(4).max(10).nullish(),
    location: z.string().default(""),
    description: z.string().default(""),
    content: z.string().nullish(),
    image: z.string().url().nullish(),
    proiectSlug: slugSchema.nullish(),
    proiectEditieSlug: slugSchema.nullish(),
    duration: z.string().nullish(),
    financedByLabel: z.string().nullish(),
    financedByUrl: z.string().url().nullish(),
    activities: z.array(z.string()).default([]),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).default(
        [],
    ),
    gallery: z.array(z.string().url()).default([]),
    email: z.string().default(""),
    phone: z.string().default(""),
    registrationUrl: z.string().url().nullish(),
    status: statusEnum.default("published"),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export const memberCreateSchema = z.object({
    abreviere: z.string().min(1).max(20),
    nume: z.string().min(1).max(300),
    numeJuridic: z.string().default(""),
    oras: z.string().default(""),
    judet: z.string().default(""),
    adresa: z.string().nullish(),
    dataInfiintarii: z.string().nullish(),
    presedinte: z.string().nullish(),
    telefon: z.string().nullish(),
    email: z.string().nullish(),
    logo: z.string().url().nullish(),
    socialLinks: z.record(z.string(), z.string()).default({}),
    categorii: z.array(z.enum(["fondator", "activ", "candidat", "potential"]))
        .default([]),
    ordine: z.number().int().default(0),
});

export const memberUpdateSchema = memberCreateSchema.partial();

export const teamCreateSchema = z.object({
    nume: z.string().min(1).max(300),
    rol: z.string().min(1).max(300),
    categorie: z.enum(["birou", "extinsa"]).default("extinsa"),
    foto: z.string().url().nullish(),
    descriere: z.string().nullish(),
    oras: z.string().nullish(),
    email: z.string().nullish(),
    socials: z.array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    ordine: z.number().int().default(0),
});

export const teamUpdateSchema = teamCreateSchema.partial();

export const contentTypes = [
    "posts",
    "pages",
    "projects",
    "events",
    "members",
    "team",
] as const;
export type ContentType = (typeof contentTypes)[number];

export function isContentType(value: string): value is ContentType {
    return (contentTypes as readonly string[]).includes(value);
}
