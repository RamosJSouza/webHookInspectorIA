import type { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Trash2Icon } from "lucide-react";
import type { z } from "zod";
import { webhooksSchema } from "../http/schemas/webhooks";
import { IconButton } from "./ui/icon-button";
import { Checkbox } from "./ui/checkbox";

type Webhook = z.infer<typeof webhooksSchema>;

interface WebhooksListItemProps {
    webhook: Webhook;
    onWebHookChecked: (webhookId: string, isChecked: boolean) => void;
    isWebHookChecked: boolean;
}

export function WebhooksListItem({
    webhook,
    onWebHookChecked,
    isWebHookChecked,
}: WebhooksListItemProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteWebhook, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`http://localhost:3333/api/webhooks/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["webhooks"] });
        },
    });

    const formatDate = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true });
    };

    const handleCheckedChange = (checked: CheckedState) => {
        onWebHookChecked(webhook.id, checked === true);
    };

    return (
        <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30">
            <div className="flex items-start gap-3 px-4 py-2.5">
                <Checkbox
                    onCheckedChange={handleCheckedChange}
                    checked={isWebHookChecked}
                />

                <Link
                    to="/webhooks/$id"
                    params={{ id: webhook.id }}
                    className="flex min-w-8 flex-1 items-start gap-3"
                >
                    <span className="w-12 shrink-0 text-right font-mono text-sm font-semibold text-zinc-300">
                        {webhook.name.split(" ")[0] || "GET"}
                    </span>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-xs leading-tight text-zinc-200">
                            {webhook.pathname}
                        </p>
                        <p className="mt-1 text-xs font-medium text-zinc-500">
                            {formatDate(webhook.createdAt)}
                        </p>
                    </div>
                </Link>

                <IconButton
                    onClick={() => deleteWebhook(webhook.id)}
                    icon={<Trash2Icon className="size-3.5 text-zinc-400" />}
                    className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    disabled={isDeleting}
                />
            </div>
        </div>
    );
}
