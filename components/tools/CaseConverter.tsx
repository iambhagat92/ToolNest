'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CaseConverter() {
    const [text, setText] = useState('')
    const [copied, setCopied] = useState<string | null>(null)

    const conversions = {
        uppercase: text.toUpperCase(),
        lowercase: text.toLowerCase(),
        titleCase: text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
        sentenceCase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
        camelCase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, ''),
        alternating: text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''),
    }

    const handleCopy = async (type: string, value: string) => {
        await navigator.clipboard.writeText(value)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
    }

    const ConversionCard = ({ title, type, value }: { title: string; type: string; value: string }) => (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
                <button
                    onClick={() => handleCopy(type, value)}
                    className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                    aria-label={`Copy ${title}`}
                >
                    {copied === type ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 min-h-[60px] text-gray-900 dark:text-gray-100 text-sm font-mono break-words">
                {value || <span className="text-gray-400">Output will appear here...</span>}
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste text to convert..."
                    className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
            </div>

            {/* Conversions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ConversionCard title="UPPERCASE" type="uppercase" value={conversions.uppercase} />
                <ConversionCard title="lowercase" type="lowercase" value={conversions.lowercase} />
                <ConversionCard title="Title Case" type="titleCase" value={conversions.titleCase} />
                <ConversionCard title="Sentence case" type="sentenceCase" value={conversions.sentenceCase} />
                <ConversionCard title="camelCase" type="camelCase" value={conversions.camelCase} />
                <ConversionCard title="aLtErNaTiNg cAsE" type="alternating" value={conversions.alternating} />
            </div>

            {/* Actions */}
            <button
                onClick={() => setText('')}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
                Clear Text
            </button>

            {/* Expert Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    When to Use Each Case
                </h3>
                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                    <li><strong>UPPERCASE:</strong> Acronyms, emphasis, headers</li>
                    <li><strong>lowercase:</strong> URLs, programming variables, email addresses</li>
                    <li><strong>Title Case:</strong> Headings, book titles, article names</li>
                    <li><strong>Sentence case:</strong> Standard sentences, descriptions</li>
                    <li><strong>camelCase:</strong> Programming (JavaScript, Java variables)</li>
                </ul>
            </div>
        </div>
    )
}
