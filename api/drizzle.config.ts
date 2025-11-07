import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega o .env do diretório raiz do projeto
config({ path: resolve(process.cwd(), '.env') });

// URL para conexão local via Docker (porta 5434 mapeada)
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5434/webhooks';

export default defineConfig({
    schema: './src/db/schema/index.ts',
    out: './src/db/migrations',
    casing: 'snake_case',
    dialect: 'postgresql',
    dbCredentials: {
        url: databaseUrl,
    },
});
