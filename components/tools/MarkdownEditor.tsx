'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Copy, Check, Info } from 'lucide-react'

const DEFAULT_MARKDOWN = `# Welcome to the Markdown Editor

Start typing in the left panel to see the preview on the right.

## Features

- **Bold** and *Italic* text
- Lists (ordered and unordered)
- [Links](https://toolsphere.com)
- Code blocks
- Blockquotes

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

> Markdown is a lightweight markup language for creating formatted text using a plain-text editor.
`

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="h-[calc(100vh-300px)] min-h-[600px] flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Info className="w-4 h-4" />
                    <span>Supports standard Markdown syntax</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" /> Copied Markdown
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" /> Copy Markdown
                        </>
                    )}
                </button>
            </div>

            {/* Split View */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Editor */}
                <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Editor
                    </label>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                        placeholder="Type your markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview
                    </label>
                    <div className="flex-1 w-full p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    return !inline ? (
                                        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 my-4 overflow-x-auto text-sm font-mono border border-gray-200 dark:border-gray-700">
                                            <code {...props}>{children}</code>
                                        </div>
                                    ) : (
                                        <code className="bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                pre({ children }) {
                                    return <>{children}</>
                                },
                                blockquote({ children }) {
                                    return (
                                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 my-4 italic text-gray-600 dark:text-gray-400">
                                            {children}
                                        </blockquote>
                                    )
                                }
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
