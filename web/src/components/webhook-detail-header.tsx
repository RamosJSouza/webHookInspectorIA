import { Badge } from "./ui/bdge";

export function WebhookDetailHeader() {
    return (
        <div className="border-b border-zinc-700 p-6">
                <div className="flex items-center gap-3">
                    <Badge>
                        POST
                    </Badge>
                    <span className="text-lg font-medium text-zinc-300">
                        /video/upload/status
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-zinc-400">
                        <span>From IP</span>
                        <span className="underline underline-offset-4">127.0.0.1</span>
                    </div>
                    <span className="w-px h-4 bg-zinc-700" />
                    <div className="flex items-center gap-1 text-sm text-zinc-400">
                        <span>at</span>
                        <span>1 minute ago</span>
                    </div>
                </div>
            </div>
    )
}