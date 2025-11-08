import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { webhooksListSchema } from "../http/schemas/webhooks";
import { WebhooksListItem } from "./webhooks-list-item";
import { useState } from "react";
import { CodeBlock } from "./ui/code-block";

type WebhooksListResponse = z.infer<typeof webhooksListSchema>;

export function WebhooksList() {
    const [checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([]);
    const [generatedHandleCode, setGeneratedHandleCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

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

    function handleWebhookChecked(webhookId: string, isChecked: boolean) {
        setCheckedWebhookIds((state) => {
            if (isChecked) {
                if (state.includes(webhookId)) {
                    return state;
                }

                return [...state, webhookId];
            }

            return state.filter((id) => id !== webhookId);
        });
    }

    const hasAnyWebhookChecked = checkedWebhookIds.length > 0;

    async function handleGenerateHandle() {
        setIsGenerating(true);
        setGeneratedHandleCode(null);
        
        try {
            const response = await fetch('http://localhost:3333/api/generate', {
                method: 'POST',
                body: JSON.stringify({ webhookIds: checkedWebhookIds }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate handle');
            }

            type GenerateHandleResponse = {
                code: string;
            }

            const data: GenerateHandleResponse = await response.json();
            setGeneratedHandleCode(data.code);
        } catch (error) {
            console.error('Error generating handle:', error);
            // Você pode adicionar um toast ou mensagem de erro aqui
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <>
        <div className="flex-1 overflow-y-auto">
            <div className="flex h-full flex-col">
                <div className="space-y-1 p-2 pb-24">
                    {webhooks.map((webhook) => (
                        <WebhooksListItem
                            key={webhook.id}
                            webhook={webhook}
                            onWebHookChecked={handleWebhookChecked}
                            isWebHookChecked={checkedWebhookIds.includes(webhook.id)}
                        />
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

                <div className="sticky bottom-0 left-0 right-0 isolate -mx-2 border-t border-zinc-800 bg-zinc-900/80 p-3 backdrop-blur">
                    <button
                        type="button"
                        disabled={!hasAnyWebhookChecked || isGenerating}
                        onClick={handleGenerateHandle}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-500/60 disabled:text-white/70"
                    >
                        {isGenerating ? (
                            <>
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Generating...
                            </>
                        ) : (
                            'Handle Generator'
                        )}
                    </button>
                </div>
            </div>
        </div>

        {/* Loading Dialog */}
        {isGenerating && (
            <Dialog.Root open={true}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-700/50 bg-zinc-900 p-8 shadow-2xl outline-none">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center">
                                <svg
                                    className="h-12 w-12 animate-spin text-indigo-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Dialog.Title className="text-lg font-semibold text-zinc-100">
                                    Generating Handler Code
                                </Dialog.Title>
                                <p className="mt-2 text-sm text-zinc-400">
                                    Please wait while we generate your TypeScript webhook handler...
                                </p>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        )}

        {/* Generated Code Dialog */}
        {generatedHandleCode && !isGenerating && (
            <Dialog.Root 
                open={!!generatedHandleCode} 
                onOpenChange={(open) => {
                    if (!open) {
                        setGeneratedHandleCode(null);
                        setCopied(false);
                    }
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex h-[90vh] max-h-[90vh] w-[95vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-zinc-700/50 bg-zinc-900 shadow-2xl outline-none">
                        <style>{`
                            .dialog-scroll-area::-webkit-scrollbar {
                                width: 10px;
                                height: 10px;
                            }
                            .dialog-scroll-area::-webkit-scrollbar-track {
                                background: rgb(39 39 42);
                                border-radius: 4px;
                            }
                            .dialog-scroll-area::-webkit-scrollbar-thumb {
                                background-color: rgb(63 63 70);
                                border-radius: 4px;
                                border: 2px solid rgb(39 39 42);
                            }
                            .dialog-scroll-area::-webkit-scrollbar-thumb:hover {
                                background-color: rgb(113 113 122);
                            }
                        `}</style>
                        
                        {/* Header */}
                        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                                    <svg
                                        className="h-5 w-5 text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <Dialog.Title className="text-lg font-semibold text-zinc-100">
                                        Generated Handler Code
                                    </Dialog.Title>
                                    <p className="text-xs text-zinc-500">
                                        TypeScript webhook handler function
                                    </p>
                                </div>
                            </div>
                            <Dialog.Close className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </Dialog.Close>
                        </div>

                        {/* Scrollable Content */}
                        <div className="min-h-0 flex-1 overflow-y-auto dialog-scroll-area px-6 py-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(63 63 70) rgb(39 39 42)' }}>
                            <CodeBlock language="typescript" code={generatedHandleCode || ''} />
                        </div>

                        {/* Footer */}
                        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
                            <button
                                onClick={async () => {
                                    if (generatedHandleCode) {
                                        await navigator.clipboard.writeText(generatedHandleCode);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }
                                }}
                                className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                            >
                                {copied ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Copy Code
                                    </>
                                )}
                            </button>
                            <Dialog.Close className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
                                Close
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        )}
        </>
    );
}