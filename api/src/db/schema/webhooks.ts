import { pgTable, serial, integer, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const webhooks = pgTable('webhooks', {
    id: text().primaryKey().$default(() => uuidv7()),
    name: text('name').notNull(),
    url: text('url').notNull(),
    pathname: text().notNull(),
    method: text('method').notNull().default('GET'),
    ip: text().notNull(),
    statusCode: integer().notNull(),
    contentType: text().notNull(),
    contentLength: integer().notNull(),
    queryParams: jsonb().$type<Record<string, string>>(),
    headers: jsonb().$type<Record<string, string>>().notNull(),
    body: text(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

