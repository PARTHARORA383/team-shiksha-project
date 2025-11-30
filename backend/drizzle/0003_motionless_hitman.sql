ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(20);