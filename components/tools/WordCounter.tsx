'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

export default function WordCounter() {
    const [text, setText] = useState('')

    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const charCount = text.length
    const charCountNoSpaces = text.replace(/\s/g, '').length
    const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphCount = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(p => p.trim().length > 0).length
    const readingTime = Math.ceil(wordCount / 200)

    return (
        <div className="space-y-6">
            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {wordCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Words
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {charCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Characters
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {charCountNoSpaces}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Chars (no spaces)
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {sentenceCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Sentences
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {paragraphCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Paragraphs
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {readingTime}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Min read
                    </div>
                </div>
            </div>

            {/* Text Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here..."
                    className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={() => setText('')}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                    Clear Text
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(`Words: ${wordCount}\nCharacters: ${charCount}\nSentences: ${sentenceCount}\nParagraphs: ${paragraphCount}`)
                    }}
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium"
                >
                    Copy Statistics
                </button>
            </div>

            {/* Expert Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Expert Tips
                        </h3>
                        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Blog posts: Aim for 1,500-2,500 words for SEO optimization</li>
                            <li>• Meta descriptions: Keep under 160 characters for best display</li>
                            <li>• Social media: Twitter (280 chars), LinkedIn (3,000 chars)</li>
                            <li>• Average reading speed: 200-250 words per minute</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
