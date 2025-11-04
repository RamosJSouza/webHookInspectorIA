import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const iconButton = tv({
    base: "flex itens-center justify-center rounded-md p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors duration-150",
    variants: {
        size: {
            sm: "size-6",
            md: "size-8",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface IconButtonProps extends ComponentProps<'button'>, VariantProps<typeof iconButton> {
    icon: React.ReactNode;
}

export function IconButton({ icon, size, className, ...props }: IconButtonProps) {
    return (
        <button 
            type="button" 
            className={iconButton({ size, className })}
            {...props}
        >
            {icon}
        </button>
    )
}