CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"phone_number" varchar(50) NOT NULL,
	"plan" varchar(50) NOT NULL,
	"meal_types" jsonb NOT NULL,
	"delivery_days" jsonb NOT NULL,
	"allergies" text,
	"total_price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
