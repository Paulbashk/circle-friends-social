CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'not-selected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('reguser', 'user', 'admin');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"login" varchar(256) NOT NULL,
	"email" varchar NOT NULL,
	"password_hash" varchar(256) NOT NULL,
	"full_name" varchar(256),
	"date_of_brith" timestamp,
	"country" text,
	"gender" "gender" DEFAULT 'not-selected' NOT NULL,
	"city" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "users_login_unique" UNIQUE("login")
);
