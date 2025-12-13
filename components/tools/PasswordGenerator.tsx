'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PasswordGenerator() {
    const [password, setPassword] = useState('')
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [copied, setCopied] = useState(false)

    const generatePassword = () => {
        let charset = ''
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
        if (includeNumbers) charset += '0123456789'
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

        if (charset === '') {
            setPassword('')
            return
        }

        const array = new Uint32Array(length)
        crypto.getRandomValues(array)

        let newPassword = ''
        for (let i = 0; i < length; i++) {
            newPassword += charset[array[i] % charset.length]
        }

        setPassword(newPassword)
    }

    const copyToClipboard = async () => {
        if (password) {
            await navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const getPasswordStrength = () => {
        if (!password) return { text: '', color: '', percent: 0 }

        let strength = 0
        if (password.length >= 8) strength += 20
        if (password.length >= 12) strength += 20
        if (password.length >= 16) strength += 10
        if (/[a-z]/.test(password)) strength += 10
        if (/[A-Z]/.test(password)) strength += 10
        if (/[0-9]/.test(password)) strength += 15
        if (/[^a-zA-Z0-9]/.test(password)) strength += 15

        if (strength < 40) return { text: 'Weak', color: 'bg-red-500', percent: strength }
        if (strength < 70) return { text: 'Medium', color: 'bg-yellow-500', percent: strength }
        return { text: 'Strong', color: 'bg-green-500', percent: strength }
    }

    const strength = getPasswordStrength()

    return (
        <div className="space-y-6">
            {/* Generated Password Display */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Generated Password
                </label>
                <div className="flex gap-3">
                    <div className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-lg break-all">
                        {password || <span className="text-gray-400">Click Generate to create a password</span>}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        disabled={!password}
                        className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Copy password"
                    >
                        {copied ? (
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                            <Copy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>
            </div>

            {/* Password Strength */}
            {password && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password Strength:
                        </span>
                        <span className={`text-sm font-semibold ${strength.text === 'Weak' ? 'text-red-600 dark:text-red-400' :
                                strength.text === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                                    'text-green-600 dark:text-green-400'
                            }`}>
                            {strength.text}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${strength.color} transition-all duration-500`}
                            style={{ width: `${strength.percent}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Length Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password Length: {length}
                </label>
                <input
                    type="range"
                    min="8"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>8</span>
                    <span>128</span>
                </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                        Uppercase (A-Z)
                    </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                        Lowercase (a-z)
                    </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                        Numbers (0-9)
                    </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                        Symbols (!@#$...)
                    </span>
                </label>
            </div>

            {/* Generate Button */}
            <button
                onClick={generatePassword}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:from-primary-700 hover:to-accent-700 transition-all flex items-center justify-center gap-2"
            >
                <RefreshCw className="w-5 h-5" />
                Generate Password
            </button>

            {/* Tips */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Password Security Tips
                </h3>
                <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                    <li>• Use a unique password for each account</li>
                    <li>• Never share your passwords with anyone</li>
                    <li>• Use a password manager to store passwords securely</li>
                    <li>• Change passwords periodically, especially for sensitive accounts</li>
                    <li>• Enable two-factor authentication (2FA) when available</li>
                </ul>
            </div>
        </div>
    )
}
