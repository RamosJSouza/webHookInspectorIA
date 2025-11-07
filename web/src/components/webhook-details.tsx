import { useSuspenseQuery } from "@tanstack/react-query"
import { z } from "zod"
import { WebhookDetailHeader } from "./webhook-detail-header"
import { SectionTile } from "./section-title"
import { SectionDataTable } from "./section-data-table"
import { CodeBlock } from "./ui/code-block"
import { webhookDetailSchema } from "../http/schemas/webhooks"

interface WebhookDetailsProps {
    id: string
}

type WebhookDetail = z.infer<typeof webhookDetailSchema>

type WebhookDetailQueryResult =
    | { status: "success"; webhook: WebhookDetail }
    | { status: "not-found" }

export function WebhookDetails({ id }: WebhookDetailsProps) {
    const { data } = useSuspenseQuery<WebhookDetailQueryResult, Error>({
        queryKey: ['webhooks', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/api/webhooks/${id}`)

            if (response.status === 404) {
                return { status: "not-found" }
            }

            if (!response.ok) {
                throw new Error("Failed to load webhook details")
            }

            const payload = await response.json()
            const webhook = webhookDetailSchema.parse(payload)

            return {
                status: "success",
                webhook,
            }
        }
    })

    if (data.status === "not-found") {
        return (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900">Webhook not found</h2>
                <p className="max-w-md text-sm text-gray-500">
                    This webhook may have been removed or never existed. Please go back to the list and select another webhook.
                </p>
            </div>
        )
    }

    const webhook = data.webhook

    const overviewData = [
        { key: 'Method', value: webhook.method },
        { key: 'Status Code', value: String(webhook.statusCode) },
        { key: 'Content Type', value: webhook.contentType || 'application/json' },
        { key: 'Content Length', value: `${webhook.contentLength || 8} bytes` },
    ]

    const headers = Object.entries(webhook.headers).map(([key, value]) => {
        return {
            key,
            value: String(value)
        }
    })

    const queryParams = Object.entries(webhook.queryParams || {}).map(([key, value]) => {
        return {
            key,
            value: String(value)
        }
    })

    return (
        <div className="h-full flex flex-col">
            <WebhookDetailHeader
                method={webhook.method}
                pathname={webhook.pathname}
                ip={webhook.ip}
                createdAt={webhook.createdAt}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-6">
                    <div className="space-y-4">
                        <SectionTile>Request Overview</SectionTile>
                        <SectionDataTable data={overviewData} />
                    </div>

                    {queryParams.length > 0 && (
                        <div className="space-y-4">
                            <SectionTile>Query Parameters</SectionTile>
                            <SectionDataTable data={queryParams} />
                        </div>
                    )}


                    <div className="space-y-4">
                        <SectionTile>Headers</SectionTile>
                        <SectionDataTable data={headers} />
                    </div>

                    {!!webhook.body && (
                        <div className="space-y-4">
                            <SectionTile>Request Body</SectionTile>
                            <CodeBlock code={webhook.body} language={""} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}