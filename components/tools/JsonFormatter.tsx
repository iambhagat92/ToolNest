'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function JsonFormatter() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const formatJson = () => {
        try {
            const parsed = JSON.parse(input)
            const formatted = JSON.stringify(parsed, null, 2)
            setOutput(formatted)
            setError('')
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid JSON')
            setOutput('')
        }
    }

    const minifyJson = () => {
        try {
            const parsed = JSON.parse(input)
            const minified = JSON.stringify(parsed)
            setOutput(minified)
            setError('')
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid JSON')
            setOutput('')
        }
    }

    const validateJson = () => {
        try {
            JSON.parse(input)
            setError('')
            setOutput('✓ Valid JSON')
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid JSON')
            setOutput('')
        }
    }

    const copyToClipboard = async () => {
        if (output) {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const clearAll = () => {
        setInput('')
        setOutput('')
        setError('')
    }

    return (
        <div className="space-y-6">
            {/* Input */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Input JSON
                    </label>
                    <button
                        onClick={clearAll}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                        Clear All
                    </button>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"key": "value", "array": [1, 2, 3]}'
                    className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={formatJson}
                    disabled={!input}
                    className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Format/Beautify
                </button>
                <button
                    onClick={minifyJson}
                    disabled={!input}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Minify
                </button>
                <button
                    onClick={validateJson}
                    disabled={!input}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Validate
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 font-semibold">Error:</span>
                        <span className="text-red-700 dark:text-red-300 font-mono text-sm">{error}</span>
                    </div>
                </div>
            )}

            {/* Output */}
            {output && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Output
                        </label>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span className="text-gray-700 dark:text-gray-300">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 overflow-x-auto font-mono text-sm max-h-96 custom-scrollbar">
                        {output}
                    </pre>
                </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    JSON Formatting Tips
                </h3>
                <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                    <li>• <strong>Format/Beautify:</strong> Adds indentation and line breaks for readability</li>
                    <li>• <strong>Minify:</strong> Removes whitespace to reduce file size for production</li>
                    <li>• <strong>Validate:</strong> Checks if your JSON syntax is correct</li>
                    <li>• All processing happens in your browser - your data stays private</li>
                </ul>
            </div>
        </div>
    )
}
