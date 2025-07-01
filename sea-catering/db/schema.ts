import { pgTable, serial, text, primaryKey, varchar, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

import type { AdapterAccount } from '@auth/core/adapters'

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

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: text("role").default('user'),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)