import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const activityTypeEnum = z.enum(["Online Class", "Quiz", "Assignment", "Discussion"]);
export const activityStatusEnum = z.enum(["Not Started", "In Progress", "Completed"]);

export const activitySchema = z.object({
  id: z.number(),
  title: z.string(),
  type: activityTypeEnum,
  status: activityStatusEnum,
  date: z.string().optional(),
  dueDate: z.string().optional(),
  duration: z.string().optional(),
  program: z.string().optional(),
  week: z.string().optional(),
});

export type Activity = z.infer<typeof activitySchema>;
export type ActivityType = z.infer<typeof activityTypeEnum>;
export type ActivityStatus = z.infer<typeof activityStatusEnum>;
