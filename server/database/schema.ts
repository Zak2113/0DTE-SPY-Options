// server/database/schema.ts
import { boolean, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin'])
export const tierEnum = pgEnum('tier', ['basic', 'essential', 'pro']) // Tiers 1, 2, 3

export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'none'])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  role: roleEnum('role').default('user').notNull(),
  tier: tierEnum('tier').default('basic').notNull(),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId: text('stripe_price_id'), 
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('none').notNull(),
})