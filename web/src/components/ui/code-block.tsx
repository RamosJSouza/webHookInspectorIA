import { useEffect, useState, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { codeToHtml } from "shiki";

interface CodeBlockProps extends ComponentProps<'div'> {
    language: string;
    code: string;
}
export function CodeBlock({className, code, language = 'json', ...props}: CodeBlockProps) {
    const [parsedCode, setParsedCode] = useState('');

    useEffect(() => {
        if(code) {
            codeToHtml(code, { 
                lang: language, 
                theme: 'dark-plus',
                transformers: []
            }).then((html) => {
                setParsedCode(html);
            }).catch((error) => {
                console.error('Error highlighting code:', error);
                // Fallback: renderizar código sem syntax highlighting
                setParsedCode(`<pre><code>${code}</code></pre>`);
            });
        }
    }, [code, language]);
    
    return (
        <div className={twMerge("relative rounded-lg border border-zinc-700 overflow-x-auto bg-[#1e1e1e]", className)} {...props}>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .shiki-code-block pre {
                        background-color: transparent !important;
                        font-family: 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace !important;
                        font-size: 14px !important;
                        line-height: 1.6 !important;
                        margin: 0 !important;
                    }
                    .shiki-code-block code {
                        background-color: transparent !important;
                        font-family: 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace !important;
                        font-size: 14px !important;
                    }
                `
            }} />
            <div className="shiki-code-block [&_pre]:p-4 [&_pre]:m-0" dangerouslySetInnerHTML={{ __html: parsedCode }} />
        </div>
    )
}
