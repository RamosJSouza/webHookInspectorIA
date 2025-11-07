import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../env';
import * as schema from './schema';

const databaseUrl = env.DATABASE_URL.toString();

// Log da URL de conexão (ocultando senha)
const urlForLog = databaseUrl.replace(/:([^:@]+)@/, ':****@');
console.log('🔗 Conectando ao banco:', urlForLog);

const pool = new Pool({
    connectionString: databaseUrl,
});

export const db = drizzle(pool, {
    schema,
    casing: 'snake_case',
});