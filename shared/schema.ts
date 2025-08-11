import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const fighters = pgTable("fighters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nickname: text("nickname"),
  age: integer("age").notNull(),
  weightClass: text("weight_class").notNull(),
  weight: real("weight").notNull(),
  reach: real("reach").notNull(),
  record: text("record").notNull(), // Format: "wins-losses-draws"
  fightingStyle: text("fighting_style").notNull(),
  imageUrl: text("image_url"),
});

export const analyses = pgTable("analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fighterId: varchar("fighter_id").references(() => fighters.id).notNull(),
  striking: real("striking").notNull(),
  grappling: real("grappling").notNull(),
  cardio: real("cardio").notNull(),
  defense: real("defense").notNull(),
  aggression: real("aggression").notNull(),
  technique: real("technique").notNull(),
  overallScore: real("overall_score").notNull(),
  strengths: jsonb("strengths").$type<string[]>().notNull(),
  weaknesses: jsonb("weaknesses").$type<string[]>().notNull(),
  recommendations: jsonb("recommendations").$type<string[]>().notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const trainingSessions = pgTable("training_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fighterId: varchar("fighter_id").references(() => fighters.id).notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(), // "striking", "grappling", "cardio", "technique"
  duration: integer("duration").notNull(), // in minutes
  scheduledFor: text("scheduled_for").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
});

export const performanceData = pgTable("performance_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fighterId: varchar("fighter_id").references(() => fighters.id).notNull(),
  fightNumber: integer("fight_number").notNull(),
  performanceScore: real("performance_score").notNull(),
  striking: real("striking").notNull(),
  grappling: real("grappling").notNull(),
  cardio: real("cardio").notNull(),
  defense: real("defense").notNull(),
});

export const insertFighterSchema = createInsertSchema(fighters).omit({
  id: true,
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingSessionSchema = createInsertSchema(trainingSessions).omit({
  id: true,
});

export const insertPerformanceDataSchema = createInsertSchema(performanceData).omit({
  id: true,
});

export type Fighter = typeof fighters.$inferSelect;
export type InsertFighter = z.infer<typeof insertFighterSchema>;
export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type TrainingSession = typeof trainingSessions.$inferSelect;
export type InsertTrainingSession = z.infer<typeof insertTrainingSessionSchema>;
export type PerformanceData = typeof performanceData.$inferSelect;
export type InsertPerformanceData = z.infer<typeof insertPerformanceDataSchema>;
