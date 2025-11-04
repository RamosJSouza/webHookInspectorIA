import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface SecttionTitleProps extends ComponentProps<'h3'> {}

export function SectionTile({ className, children, ...props }: SecttionTitleProps) {
    return (
        <h3 className={twMerge("text-base font-semibold text-zinc-100 mb-2", className)} {...props}>
            {children}
        </h3>
    )
}