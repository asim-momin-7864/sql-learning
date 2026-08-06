CREATE TYPE "status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "notes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"status" "status" DEFAULT 'draft'::"status" NOT NULL,
	"tags" varchar(100)[] DEFAULT '{}'::varchar(100)[] NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	-- dummy author_id for now
	"author_id" integer DEFAULT 1 NOT NULL, 
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
