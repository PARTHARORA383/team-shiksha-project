import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  // Required fields
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),

  // Optional fields
  lastName: varchar("last_name", { length: 255 }),
  city: varchar("city", { length: 255 }),
  country: varchar("country", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  profile: text("profile"),
  profilePic: varchar("profile_pic", { length: 500 }),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
