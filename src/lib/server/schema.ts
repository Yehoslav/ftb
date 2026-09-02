import { sql } from "drizzle-orm";
import {
    type AnySQLiteColumn,
    index,
    integer,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";

const timestamps = {
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
};

export const posts = sqliteTable(
    "posts",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        slug: text("slug").notNull().unique(),
        title: text("title").notNull(),
        content: text("content").notNull().default(""),
        excerpt: text("excerpt").notNull().default(""),
        featuredImageUrl: text("featured_image_url"),
        featuredImageAlt: text("featured_image_alt"),
        featuredImageSrcset: text("featured_image_srcset"),
        featuredImageSizes: text("featured_image_sizes"),
        featuredImageWidth: integer("featured_image_width"),
        featuredImageHeight: integer("featured_image_height"),
        status: text("status", { enum: ["draft", "published"] })
            .notNull()
            .default("draft"),
        category: text("category").notNull().default("actualitati"),
        authorId: text("author_id"),
        wpId: integer("wp_id"),
        date: integer("date", { mode: "timestamp" }).notNull(),
        ...timestamps,
    },
    (t) => [index("posts_status_date_idx").on(t.status, t.date)],
);

export const pages = sqliteTable(
    "pages",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        slug: text("slug").notNull().unique(),
        title: text("title").notNull(),
        content: text("content").notNull().default(""),
        description: text("description").notNull().default(""),
        categorie: text("categorie"),
        volatility: text("volatility", {
            enum: ["timeless", "volatile", "critical"],
        }),
        parentId: integer("parent_id").references(
            (): AnySQLiteColumn => pages.id,
            {
                onDelete: "set null",
            },
        ),
        menuOrder: integer("menu_order").notNull().default(0),
        status: text("status", { enum: ["draft", "published"] })
            .notNull()
            .default("published"),
        wpId: integer("wp_id"),
        date: integer("date", { mode: "timestamp" }),
        modified: integer("modified", { mode: "timestamp" }),
        ...timestamps,
    },
    (t) => [index("pages_categorie_idx").on(t.categorie)],
);

export const projects = sqliteTable(
    "projects",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        slug: text("slug").notNull().unique(),
        type: text("type", { enum: ["hub", "edition"] }).notNull(),
        titlu: text("titlu").notNull(),
        categorie: text("categorie", { enum: ["anuale", "singulare"] }),
        descriere: text("descriere").notNull().default(""),
        imagine: text("imagine"),
        culoare: text("culoare"),
        domenii: text("domenii", { mode: "json" })
            .$type<string[]>()
            .notNull()
            .default([]),
        website: text("website"),
        proiectSlug: text("proiect_slug"),
        proiectParinteSlug: text("proiect_parinte_slug"),
        an: integer("an"),
        perioada: text("perioada"),
        finantator: text("finantator"),
        activitati: text("activitati", { mode: "json" })
            .$type<string[]>()
            .notNull()
            .default([]),
        beneficiari: text("beneficiari"),
        voluntari: text("voluntari"),
        parteneri: text("parteneri"),
        galerie: text("galerie", { mode: "json" })
            .$type<string[]>()
            .notNull()
            .default([]),
        statistici: text("statistici", { mode: "json" })
            .$type<Array<{ label: string; value: string }>>()
            .notNull()
            .default([]),
        materiale: text("materiale", { mode: "json" })
            .$type<Array<{ label: string; url: string }>>()
            .notNull()
            .default([]),
        stare: text("stare", {
            enum: ["planificat", "in-desfasurare", "finalizat"],
        }),
        registrationUrl: text("registration_url"),
        status: text("status", { enum: ["draft", "published"] })
            .notNull()
            .default("published"),
        ...timestamps,
    },
    (
        t,
    ) => [
        index("projects_type_idx").on(t.type),
        index("projects_proiect_slug_idx").on(t.proiectSlug),
    ],
);

export const events = sqliteTable(
    "events",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        slug: text("slug").notNull().unique(),
        title: text("title").notNull(),
        date: text("date").notNull(),
        dateEnd: text("date_end"),
        location: text("location").notNull().default(""),
        description: text("description").notNull().default(""),
        content: text("content"),
        image: text("image"),
        proiectSlug: text("proiect_slug"),
        proiectEditieSlug: text("proiect_editie_slug"),
        duration: text("duration"),
        financedByLabel: text("financed_by_label"),
        financedByUrl: text("financed_by_url"),
        activities: text("activities", { mode: "json" })
            .$type<string[]>()
            .notNull()
            .default([]),
        stats: text("stats", { mode: "json" })
            .$type<Array<{ label: string; value: string }>>()
            .notNull()
            .default([]),
        gallery: text("gallery", { mode: "json" })
            .$type<string[]>()
            .notNull()
            .default([]),
        email: text("email").notNull().default(""),
        phone: text("phone").notNull().default(""),
        registrationUrl: text("registration_url"),
        status: text("status", { enum: ["draft", "published"] })
            .notNull()
            .default("published"),
        ...timestamps,
    },
    (t) => [index("events_date_idx").on(t.date)],
);

export const members = sqliteTable("members", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    abreviere: text("abreviere").notNull(),
    nume: text("nume").notNull(),
    numeJuridic: text("nume_juridic").notNull().default(""),
    oras: text("oras").notNull().default(""),
    judet: text("judet").notNull().default(""),
    adresa: text("adresa"),
    dataInfiintarii: text("data_infiintarii"),
    presedinte: text("presedinte"),
    telefon: text("telefon"),
    email: text("email"),
    logo: text("logo"),
    socialLinks: text("social_links", { mode: "json" })
        .$type<Record<string, string>>()
        .notNull()
        .default({}),
    categorii: text("categorii", { mode: "json" })
        .$type<Array<"fondator" | "activ" | "candidat" | "potential">>()
        .notNull()
        .default([]),
    ordine: integer("ordine").notNull().default(0),
    ...timestamps,
});

export const team = sqliteTable("team", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nume: text("nume").notNull(),
    rol: text("rol").notNull(),
    categorie: text("categorie", { enum: ["birou", "extinsa"] })
        .notNull()
        .default("extinsa"),
    foto: text("foto"),
    descriere: text("descriere"),
    oras: text("oras"),
    email: text("email"),
    socials: text("socials", { mode: "json" })
        .$type<Array<{ label: string; url: string }>>()
        .notNull()
        .default([]),
    ordine: integer("ordine").notNull().default(0),
    ...timestamps,
});

export const media = sqliteTable("media", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    wpId: integer("wp_id"),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    alt: text("alt").notNull().default(""),
    caption: text("caption").notNull().default(""),
    mimeType: text("mime_type").notNull().default(""),
    type: text("type", { enum: ["image", "document", "video", "other"] })
        .notNull()
        .default("image"),
    width: integer("width"),
    height: integer("height"),
    uploadedBy: text("uploaded_by"),
    uploadedAt: integer("uploaded_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    wpUserId: integer("wp_user_id"),
    username: text("username").notNull().unique(),
    displayName: text("display_name").notNull().default(""),
    email: text("email"),
    role: text("role", { enum: ["admin", "editor"] })
        .notNull()
        .default("editor"),
    lastLogin: integer("last_login", { mode: "timestamp" }),
    ...timestamps,
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type TeamMember = typeof team.$inferSelect;
export type NewTeamMember = typeof team.$inferInsert;
export type MediaItem = typeof media.$inferSelect;
export type NewMediaItem = typeof media.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
