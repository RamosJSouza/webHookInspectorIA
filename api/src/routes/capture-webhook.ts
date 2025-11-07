import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { webhooks } from "@/db/schema/webhooks";
import { db } from "@/db";

export const captureWebhooks: FastifyPluginAsyncZod = async (app) => {
    app.all('/capture/*', 
        {
            schema: {
                summary: 'Capture incoming webhook requests',
                tags: ['External'],
                hide: true,
                response: {
                    201: z.object({ id: z.uuidv7() }),
                },
            },
        }, 
        async (request, reply) => {
            const url = new URL(request.url);
            const pathname = url.pathname.replace(/^\/capture/, '');
            const headers = Object.fromEntries(
                Object.entries(request.headers).map(([key, value]) => [
                    key, 
                    Array.isArray(value) ? value.join(', ') : value || '',
                ])
            );
            
            let body: string | null = null;
            if (request.body) {
                body = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
            }

            const ip = request.ip || 'unknown';
            const contentType = request.headers['content-type'] || 'application/octet-stream';
            const contentLength = request.headers['content-length'] 
                ? Number(request.headers['content-length']) 
                : 0;
            
            const queryParams: Record<string, string> = {};
            url.searchParams.forEach((value, key) => {
                queryParams[key] = value;
            });
            
            const result = await db
                .insert(webhooks)
                .values({
                    name: `${request.method} ${pathname}`,
                    url: url.toString(),
                    pathname,
                    method: request.method ?? 'GET',
                    headers,
                    body,
                    ip,
                    statusCode: 200,
                    contentType,
                    contentLength,
                    queryParams: Object.keys(queryParams).length > 0 ? queryParams : null,
                })
                .returning({ id: webhooks.id });
            
            return reply.send({ id: result[0].id });
        });
};