import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";
import { webhooksListSchema } from "../http/schemas/webhooks";
import { WebhooksListItem } from "./webhooks-list-item";

type WebhooksListResponse = z.infer<typeof webhooksListSchema>;

export function WebhooksList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useSuspenseInfiniteQuery<WebhooksListResponse, Error>({
            queryKey: ["webhooks"],
            queryFn: async ({ pageParam }) => {
                const url = new URL("http://localhost:3333/api/webhooks");

                url.searchParams.set("limit", "10");

                if (typeof pageParam === "string") {
                    url.searchParams.set("cursor", pageParam);
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to load webhooks");
                }

                const result = await response.json();
                return webhooksListSchema.parse(result);
            },
            initialPageParam: undefined,
            getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        });

    const webhooks = data.pages.flatMap((page) => page.webhooks);

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
                {webhooks.map((webhook) => (
                    <WebhooksListItem key={webhook.id} webhook={webhook} />
                ))}

                {hasNextPage && (
                    <button
                        type="button"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                    </button>
                )}
            </div>
        </div>
    );
}