import { CopyIcon } from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { WebhooksList } from "./webhooks-list";

export function Sidebar() {
    return (
        <div className="flex h-screen flex-col">
            <div className="flex itens-center justifu-between border-b border-zinc-700 px-4 py-5">
                <div className="flex itens-baseline">
                    <span className="font-semibold text-zinc-100">webhook</span>
                    <span className="font-seminomal text-zinc-400">ramos</span>
                    <span className="font-semibold text-zinc-100">inspect</span>
                </div>

            </div>

            <div className="flex itens-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2.5">
                <div className="flex-1 min-w-8 flex items-center gap-1 text-xs font-mono text-zinc-300">
                    <span className="truncate">https://localhost:3000/api/capture</span>
                </div>
                <IconButton
                icon={<CopyIcon className="size-4" />}
            />
            </div>

            <WebhooksList />
        </div>
    )
}