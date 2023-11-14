CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`parent_id` integer NOT NULL,
	`author` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`image` blob
);
