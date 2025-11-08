import { db } from "@/db";
import { webhooks } from "@/db/schema/webhooks";
import { generateText } from "ai";
import { inArray } from "drizzle-orm";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { google } from "@ai-sdk/google";

const BASE_PROMPT = [
    "You are a senior TypeScript developer.",
    "Write a complete, production-ready TypeScript webhook handler function that processes incoming webhook events from multiple sources.",
    "",
    "The function must:",
    "1. Accept a raw request body (as `unknown`) and a `source` identifier (string) indicating which webhook provider sent the data.",
    "2. Use **Zod** to define strict schemas for **each possible event type** from the provided webhook examples.",
    "3. Parse and validate the incoming payload against the correct schema based on an `event` field (or equivalent) in the payload.",
    "4. Return a structured, typed response object with:",
    "   - `success: boolean`",
    "   - `event: string` (the normalized event name)",
    "   - `data: T` (strongly typed parsed data)",
    "   - `error?: string` (if validation fails)",
    "",
    "### Input Examples (provide these in your actual prompt):",
    "```json",
    "// Webhook 1: Stripe - payment_intent.succeeded",
    "{",
    '  "id": "evt_1ABC123",',
    '  "object": "event",',
    '  "type": "payment_intent.succeeded",',
    '  "data": { "object": { "id": "pi_123", "amount": 999, "currency": "usd" } }',
    "}",
    "",
    "// Webhook 2: GitHub - push event",
    "{",
    '  "ref": "refs/heads/main",',
    '  "before": "a1b2c3d",',
    '  "after": "e4f5g6h",',
    '  "repository": { "full_name": "org/repo" },',
    '  "pusher": { "name": "alice" },',
    '  "head_commit": { "message": "Fix bug" }',
    "}",
    "",
    "// Webhook 3: Custom App - user.created",
    "{",
    '  "event": "user.created",',
    '  "timestamp": 1736281200,',
    '  "payload": { "id": "usr_123", "email": "user@example.com", "role": "admin" }',
    "}",
    "```",
    "",
    "Use the following captured payloads to infer any additional variations that should be supported:",
    "Return only the TypeScript code without any additional text or comments and within \'``````typescript\' and \'```\' tags.",
    "No return ```typescript or other markdown symbols."
].join("\n");

export const generateHandle: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/api/generate",
        {
            schema: {
                summary: "Generate TypeScript handle from webhooks",
                tags: ["webhooks"],
                body: z.object({
                    webhookIds: z.array(z.string()),
                }),
                response: {
                    201: z.object({
                        code: z.string(),
                    }),
                    400: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { webhookIds } = request.body;

            if (webhookIds.length === 0) {
                return reply
                    .status(400)
                    .send({ message: "No webhook IDs provided" });
            }

            const result = await db
                .select({
                    body: webhooks.body,
                })
                .from(webhooks)
                .where(inArray(webhooks.id, webhookIds));

            const webhookBodies = result
                .map((webhook, index) => {
                    const serialized =
                        typeof webhook.body === "string"
                            ? webhook.body
                            : JSON.stringify(webhook.body, null, 2);

                    return [
                        `// Captured Webhook #${index + 1}`,
                        serialized || "{}",
                    ].join("\n");
                })
                .join("\n\n");

            const prompt = `${BASE_PROMPT}\n\n\`\`\`json\n${webhookBodies}\n\`\`\`\n\nReturn only the final TypeScript code.`;

            const { text } = await generateText({
                model: google("gemini-2.0-flash-lite"),
                prompt,
            });

            return reply.status(201).send({ code: text });
        }
    );
};