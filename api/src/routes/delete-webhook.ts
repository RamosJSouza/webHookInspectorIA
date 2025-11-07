import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { webhooks } from "@/db/schema/webhooks";
import { db } from "@/db";
import { eq } from "drizzle-orm";


export const deleteWebhooks: FastifyPluginAsyncZod = async (app) => {
    app.delete('/api/webhooks/:id', 
        {
            schema: {
                summary: 'Delete as especific webhook by id',
                tags: ['webhooks'],
                params: z.object({
                    id: z.uuidv7(),
                }),
                response: {
                    204: z.void(),
                    404: z.object({
                        message: z.string().default('Webhook not found'),
                    }),
                },
            },
        }, 
        async (request, reply) => {
        const { id } = request.params;

        const result = await db
            .delete(webhooks)
            .where(eq(webhooks.id, id))
            .returning()

        if( result.length === 0 ) {
            return reply.status(404).send({ message: 'Webhook not found' });
        }    

        return reply.status(204).send();
    });
};