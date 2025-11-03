import { prisma } from "@/lib/prisma";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
    app.get('/api/webhooks', 
        {
            schema: {
                summary: 'List webhooks',
                tags: ['webhooks'],
                querystring: z.object({
                    page: z.number().optional(),
                    limit: z.coerce.number().min(1).max(100).default(20),
                }),
                response: {
                    200: z.array(z.object({
                        id: z.string(),
                        name: z.string(),
                        url: z.string(),
                        createdAt: z.date(),
                    })),
                },
            },
        }, 
        async (request, reply) => {
        const { page, limit } = request.query;

        return [{
            id: '1',
            name: 'Webhook 1',
            url: 'https://www.example.com',
            createdAt: new Date(),
        }]
    });
};