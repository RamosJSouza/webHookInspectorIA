import { Link } from "@tanstack/react-router";
import { IconButton } from "./ui/icon-button";
import { Trash2Icon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import type { z } from "zod";
import { webhooksSchema } from "../http/schemas/webhooks";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Webhook = z.infer<typeof webhooksSchema>;

interface WebhooksListItemProps {
    webhook: Webhook;
}

export function WebhooksListItem({ webhook }: WebhooksListItemProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteWebhook } = useMutation({
        mutationFn: async () => {
            await fetch(`http://localhost:3333/api/webhooks/${webhook.id}`, {
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

    return (
        <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30">
            <div className="flex items-start gap-3 px-4 py-2.5">
                <Checkbox />
                <Link to="/webhooks/$id" params={{ id: webhook.id }} className="flex flex-1 min-w-8 items-start gap-3">
                    <span className="w-12 shrink-0 font-mono text-sm font-semibold text-zinc-300 text-right">
                        {webhook.name.split(' ')[0] || 'GET'}
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-xs text-zinc-200 leading-tight font-mono">
                            {webhook.pathname}
                        </p>
                        <p className="text-xs text-zinc-500 font-medium mt-1">
                            {formatDate(webhook.createdAt)}
                        </p>
                    </div>
                </Link>
                <IconButton 
                    onClick={() => deleteWebhook(webhook.id)}
                    icon={<Trash2Icon className="size-3.5 text-zinc-400" />} 
                    className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                 />
            </div>
        </div>
    )
}