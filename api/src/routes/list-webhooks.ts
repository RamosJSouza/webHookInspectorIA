import { webhooks } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "@/db";
import { lt, asc, desc } from "drizzle-orm";


export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
    app.get('/api/webhooks',
        {
            schema: {
                summary: 'List webhooks',
                tags: ['webhooks'],
                querystring: z.object({
                    limit: z.coerce.number().min(1).max(100).default(20),
                    cursor: z.string().optional(),
                    orderBy: z.enum(['createdAt']).optional(),
                    orderDirection: z.enum(['asc', 'desc']).optional(),
                }),
                response: {
                    200: z.object({
                        webhooks: z.array(
                            createSelectSchema(webhooks).pick({
                                id: true,
                                name: true,
                                pathname: true,
                                createdAt: true,
                            })
                        ),
                        nextCursor: z.string().optional(),
                        previousCursor: z.string().optional(),
                    }),
                    500: z.object({
                        statusCode: z.number(),
                        error: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            try {
                const { limit, cursor, orderBy, orderDirection } = request.query;

            const baseQuery = db
                .select({
                    id: webhooks.id,
                    name: webhooks.name,
                    pathname: webhooks.pathname,
                    createdAt: webhooks.createdAt,
                })
                .from(webhooks);

                const queryWithWhere = cursor
                    ? baseQuery.where(lt(webhooks.id, cursor))
                    : baseQuery;

                const direction = orderDirection === 'asc' ? asc : desc;
                const queryWithOrder = queryWithWhere.orderBy(direction(webhooks.createdAt));

                const result = await queryWithOrder.limit(limit + 1);

                const hasMore = result.length > limit;
                const items = hasMore ? result.slice(0, limit) : result;
                const nextCursor = hasMore ? items[items.length - 1].id : undefined;

                return reply.send({
                    webhooks: items,
                    nextCursor,
                    previousCursor: cursor ? cursor : undefined,
                });
            } catch (error) {
                console.error('Error listing webhooks:', error);
                reply.code(500);
                return reply.send({
                    statusCode: 500,
                    error: 'Internal Server Error',
                    message: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        });
};