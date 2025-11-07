import { z } from "zod";

export const webhooksSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
    pathname: z.string(),
    createdAt: z.coerce.date(),
});

export const webhooksListSchema = z.object({
    webhooks: z.array(webhooksSchema),
    nextCursor: z.string().optional(),
    previousCursor: z.string().optional(),
});

export const webhookDetailSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    pathname: z.string(),
    ip: z.string(),
    statusCode: z.number(),
    contentType: z.string(),
    contentLength: z.number(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']),
    queryParams: z.record(z.string(), z.string()).nullable(),
    headers: z.record(z.string(), z.string()),
    body: z.string().nullable(),
    createdAt: z.coerce.date(),
}).strict();