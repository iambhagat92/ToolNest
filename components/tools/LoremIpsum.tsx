'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

const LOREM_TEXT = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    "Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    "Et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.",
    "Id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    "Omnis voluptas assumenda est, omnis dolor repellendus.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
]

export default function LoremIpsum() {
    const [count, setCount] = useState(3)
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
    const [text, setText] = useState('')
    const [copied, setCopied] = useState(false)

    // Generate text on initial load and when dependencies change
    useState(() => {
        generateText()
    })

    function generateText() {
        let result: string[] = []

        if (type === 'paragraphs') {
            for (let i = 0; i < count; i++) {
                // Construct a paragraph from 3-6 random sentences
                const sentenceCount = Math.floor(Math.random() * 4) + 3
                const paragraph = Array.from({ length: sentenceCount }, () =>
                    LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]
                ).join(' ')
                result.push(paragraph)
            }
            setText(result.join('\n\n'))
        } else if (type === 'sentences') {
            for (let i = 0; i < count; i++) {
                result.push(LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)])
            }
            setText(result.join(' '))
        } else {
            // Words
            const allWords = LOREM_TEXT.join(' ').replace(/[.,]/g, '').toLowerCase().split(' ')
            for (let i = 0; i < count; i++) {
                result.push(allWords[Math.floor(Math.random() * allWords.length)])
            }
            // Capitalize first word
            if (result.length > 0) {
                result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1)
            }
            setText(result.join(' ') + '.')
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleRegenerate = () => {
        generateText()
        setCopied(false)
    }

    // Update text when settings change
    useState(() => {
        generateText()
    })

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type
                        </label>
                        <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => {
                                        setType(t)
                                        setTimeout(generateText, 0)
                                    }}
                                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors capitalize ${type === t
                                            ? 'bg-primary-500 text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Quantity: {count}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={count}
                            onChange={(e) => {
                                setCount(parseInt(e.target.value))
                                setTimeout(generateText, 0)
                            }}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                    </div>
                </div>
            </div>

            {/* Output */}
            <div className="relative group">
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={handleRegenerate}
                        className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-all shadow-sm"
                        title="Regenerate"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors shadow-sm font-medium"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" /> Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" /> Copy Text
                            </>
                        )}
                    </button>
                </div>

                <textarea
                    value={text}
                    readOnly
                    className="w-full h-96 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 resize-none outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-lg leading-relaxed font-serif"
                />
            </div>
        </div>
    )
}
