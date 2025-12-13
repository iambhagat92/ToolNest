'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function Base64Tool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const encodeBase64 = () => {
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)))
            setOutput(encoded)
            setError('')
        } catch (e) {
            setError('Failed to encode. Please check your input.')
            setOutput('')
        }
    }

    const decodeBase64 = () => {
        try {
            const decoded = decodeURIComponent(escape(atob(input)))
            setOutput(decoded)
            setError('')
        } catch (e) {
            setError('Invalid Base64 string. Please check your input.')
            setOutput('')
        }
    }

    const handleConvert = () => {
        if (!input.trim()) {
            setOutput('')
            setError('')
            return
        }

        if (mode === 'encode') {
            encodeBase64()
        } else {
            decodeBase64()
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
            {/* Mode Selector */}
            <div className="flex gap-3">
                <button
                    onClick={() => {
                        setMode('encode')
                        setOutput('')
                        setError('')
                    }}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${mode === 'encode'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => {
                        setMode('decode')
                        setOutput('')
                        setError('')
                    }}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${mode === 'decode'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    Decode
                </button>
            </div>

            {/* Input */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {mode === 'encode' ? 'Text to Encode' : 'Base64 String to Decode'}
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
                    placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                    className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                />
            </div>

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                disabled={!input}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 font-semibold">Error:</span>
                        <span className="text-red-700 dark:text-red-300">{error}</span>
                    </div>
                </div>
            )}

            {/* Output */}
            {output && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
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
                    <pre className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 overflow-x-auto font-mono text-sm whitespace-pre-wrap break-all custom-scrollbar">
                        {output}
                    </pre>
                </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    Base64 Encoding Tips
                </h3>
                <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                    <li>• Base64 is encoding, NOT encryption - it doesn&apos;t secure data</li>
                    <li>• Use Base64 for binary-to-text encoding (images, files)</li>
                    <li>• Base64 increases data size by approximately 33%</li>
                    <li>• All processing happens in your browser for privacy</li>
                    <li>• Commonly used in data URLs, email attachments, and APIs</li>
                </ul>
            </div>
        </div>
    )
}
