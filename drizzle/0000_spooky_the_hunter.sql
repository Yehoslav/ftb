CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`date_end` text,
	`location` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`content` text,
	`image` text,
	`proiect_slug` text,
	`proiect_editie_slug` text,
	`duration` text,
	`financed_by_label` text,
	`financed_by_url` text,
	`activities` text DEFAULT '[]' NOT NULL,
	`stats` text DEFAULT '[]' NOT NULL,
	`gallery` text DEFAULT '[]' NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`registration_url` text,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE INDEX `events_date_idx` ON `events` (`date`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`wp_id` integer,
	`filename` text NOT NULL,
	`url` text NOT NULL,
	`alt` text DEFAULT '' NOT NULL,
	`caption` text DEFAULT '' NOT NULL,
	`mime_type` text DEFAULT '' NOT NULL,
	`type` text DEFAULT 'image' NOT NULL,
	`width` integer,
	`height` integer,
	`uploaded_by` text,
	`uploaded_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`abreviere` text NOT NULL,
	`nume` text NOT NULL,
	`nume_juridic` text DEFAULT '' NOT NULL,
	`oras` text DEFAULT '' NOT NULL,
	`judet` text DEFAULT '' NOT NULL,
	`adresa` text,
	`data_infiintarii` text,
	`presedinte` text,
	`telefon` text,
	`email` text,
	`logo` text,
	`social_links` text DEFAULT '{}' NOT NULL,
	`categorii` text DEFAULT '[]' NOT NULL,
	`ordine` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`categorie` text,
	`volatility` text,
	`parent_id` integer,
	`menu_order` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`wp_id` integer,
	`date` integer,
	`modified` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
CREATE INDEX `pages_categorie_idx` ON `pages` (`categorie`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`featured_image_url` text,
	`featured_image_alt` text,
	`featured_image_srcset` text,
	`featured_image_sizes` text,
	`featured_image_width` integer,
	`featured_image_height` integer,
	`status` text DEFAULT 'draft' NOT NULL,
	`category` text DEFAULT 'actualitati' NOT NULL,
	`author_id` text,
	`wp_id` integer,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `posts_status_date_idx` ON `posts` (`status`,`date`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`type` text NOT NULL,
	`titlu` text NOT NULL,
	`categorie` text,
	`descriere` text DEFAULT '' NOT NULL,
	`imagine` text,
	`culoare` text,
	`domenii` text DEFAULT '[]' NOT NULL,
	`website` text,
	`proiect_slug` text,
	`proiect_parinte_slug` text,
	`an` integer,
	`perioada` text,
	`finantator` text,
	`activitati` text DEFAULT '[]' NOT NULL,
	`beneficiari` text,
	`voluntari` text,
	`parteneri` text,
	`galerie` text DEFAULT '[]' NOT NULL,
	`statistici` text DEFAULT '[]' NOT NULL,
	`materiale` text DEFAULT '[]' NOT NULL,
	`stare` text,
	`registration_url` text,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE INDEX `projects_type_idx` ON `projects` (`type`);--> statement-breakpoint
CREATE INDEX `projects_proiect_slug_idx` ON `projects` (`proiect_slug`);--> statement-breakpoint
CREATE TABLE `team` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nume` text NOT NULL,
	`rol` text NOT NULL,
	`categorie` text DEFAULT 'extinsa' NOT NULL,
	`foto` text,
	`descriere` text,
	`oras` text,
	`email` text,
	`socials` text DEFAULT '[]' NOT NULL,
	`ordine` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`wp_user_id` integer,
	`username` text NOT NULL,
	`display_name` text DEFAULT '' NOT NULL,
	`email` text,
	`role` text DEFAULT 'editor' NOT NULL,
	`last_login` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);