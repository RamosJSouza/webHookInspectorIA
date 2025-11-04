import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

export function Checkbox() {
    return (
        <RadixCheckbox.Root className="w-5 h-5 rounded border border-zinc-600 bg-zinc-700/50 flex items-center justify-center outline-none transition-all duration-200 hover:border-green-500/50 hover:bg-zinc-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-green-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400 data-[state=checked]:shadow-lg data-[state=checked]:shadow-green-500/30 data-[state=checked]:ring-2 data-[state=checked]:ring-green-400/30">
            <RadixCheckbox.Indicator className="size-3.5 text-white flex items-center justify-center">
                <CheckIcon className="size-3 strokeWidth-3 drop-shadow-sm" />
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
    )
}