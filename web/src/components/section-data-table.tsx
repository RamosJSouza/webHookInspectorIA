import type { ComponentProps } from "react";

interface SectionDataTableProps extends ComponentProps<'div'> {
    data: Array<{
        key: string;
        value: string;
    }>;
}

import { twMerge } from "tailwind-merge";

export function SectionDataTable({ className, data, ...props }: SectionDataTableProps) {
    return (
        <div className={twMerge("overflow-hidden rounded-lg border border-zinc-700", className)} {...props}>
            <table className="w-full">
                <tbody>
                    {data.map(({ key, value }) => (
                        <tr key={key} className="border-b border-zinc-700">
                            <td className="px-3 py-3 text-sm font-medium text-zinc-400 bg-zinc-700 ">{key}</td>
                            <td className="px-3 py-3 text-sm font-mono text-zinc-300">{String(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}