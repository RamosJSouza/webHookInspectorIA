import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default('0.0.0.0'),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
    DATABASE_URL: z.string().transform((url) => {
        return url.trim().replace(/^["']|["']$/g, '');
    }).pipe(z.url()),
});

export const env = envSchema.parse(process.env);