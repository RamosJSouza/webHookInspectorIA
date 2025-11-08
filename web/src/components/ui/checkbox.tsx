import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type CheckboxProps = RadixCheckbox.CheckboxProps;

export function Checkbox({ className, ...props }: CheckboxProps) {
    return (
        <RadixCheckbox.Root
            {...props}
            className={twMerge(
                "flex h-5 w-5 items-center justify-center rounded border border-zinc-600 bg-zinc-700/50 outline-none transition-all duration-200 hover:border-green-500/50 hover:bg-zinc-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-900 data-[state=checked]:border-green-400 data-[state=checked]:bg-green-500 data-[state=checked]:ring-2 data-[state=checked]:ring-green-400/30 data-[state=checked]:shadow-lg data-[state=checked]:shadow-green-500/30",
                className,
            )}
        >
            <RadixCheckbox.Indicator className="flex size-3.5 items-center justify-center text-white">
                <CheckIcon className="size-3 strokeWidth-3 drop-shadow-sm" />
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
    );
}