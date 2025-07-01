import { pgTable, serial, text, varchar, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(), 
  phoneNumber: varchar('phone_number', { length: 50 }).notNull(),
  plan: varchar('plan', { length: 50 }).notNull(), 
  mealTypes: jsonb('meal_types').$type<string[]>().notNull(), 
  deliveryDays: jsonb('delivery_days').$type<string[]>().notNull(),
  allergies: text('allergies'),
  totalPrice: integer('total_price').notNull(), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});