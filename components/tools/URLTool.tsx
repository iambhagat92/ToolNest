'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function URLTool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const encodeURL = () => {
        try {
            const encoded = encodeURIComponent(input)
            setOutput(encoded)
        } catch (e) {
            setOutput('Error encoding URL')
        }
    }

    const decodeURL = () => {
        try {
            const decoded = decodeURIComponent(input)
            setOutput(decoded)
        } catch (e) {
            setOutput('Error decoding URL')
        }
    }

    const handleConvert = () => {
        if (!input.trim()) {
            setOutput('')
            return
        }

        if (mode === 'encode') {
            encodeURL()
        } else {
            decodeURL()
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
    }

    return (
        <div className="space-y-6">
            {/* Mode Selector */}
            <div className="flex gap-3">
                <button
                    onClick={() => {
                        setMode('encode')
                        setOutput('')
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
                        {mode === 'encode' ? 'URL or Text to Encode' : 'Encoded URL to Decode'}
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
                    placeholder={mode === 'encode' ? 'e.g., https://example.com/search?q=hello world&lang=en' : 'e.g., https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den'}
                    className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                />
            </div>

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                disabled={!input}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
            </button>

            {/* Output */}
            {output && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}
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

            {/* Common Characters Reference */}
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                <h3 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-3">
                    Common URL Encoded Characters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-white dark:bg-cyan-900/30 rounded-lg p-2">
                        <div className="text-cyan-600 dark:text-cyan-400 font-mono">Space</div>
                        <div className="text-cyan-900 dark:text-cyan-100 font-mono">%20</div>
                    </div>
                    <div className="bg-white dark:bg-cyan-900/30 rounded-lg p-2">
                        <div className="text-cyan-600 dark:text-cyan-400 font-mono">&amp;</div>
                        <div className="text-cyan-900 dark:text-cyan-100 font-mono">%26</div>
                    </div>
                    <div className="bg-white dark:bg-cyan-900/30 rounded-lg p-2">
                        <div className="text-cyan-600 dark:text-cyan-400 font-mono">=</div>
                        <div className="text-cyan-900 dark:text-cyan-100 font-mono">%3D</div>
                    </div>
                    <div className="bg-white dark:bg-cyan-900/30 rounded-lg p-2">
                        <div className="text-cyan-600 dark:text-cyan-400 font-mono">?</div>
                        <div className="text-cyan-900 dark:text-cyan-100 font-mono">%3F</div>
                    </div>
                </div>
                <ul className="space-y-1 text-sm text-cyan-800 dark:text-cyan-200 mt-4">
                    <li>• URL encoding converts special characters to % format</li>
                    <li>• Essential for passing data in query strings</li>
                    <li>• Ensures URLs work correctly across different browsers</li>
                </ul>
            </div>
        </div>
    )
}
