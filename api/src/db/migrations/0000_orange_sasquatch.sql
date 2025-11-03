CREATE TABLE "webhooks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"ip" text NOT NULL,
	"status_code" integer NOT NULL,
	"content_type" text NOT NULL,
	"content_length" integer NOT NULL,
	"query_params" jsonb,
	"headers" jsonb NOT NULL,
	"body" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
