'use client'

import { useState } from 'react'

export default function PercentageCalculator() {
    const [mode, setMode] = useState<'of' | 'is' | 'increase' | 'decrease'>('of')

    // What is X% of Y?
    const [percentOf, setPercentOf] = useState('')
    const [numberOf, setNumberOf] = useState('')

    // X is what % of Y?
    const [numberIs, setNumberIs] = useState('')
    const [totalIs, setTotalIs] = useState('')

    // Percentage increase/decrease
    const [original, setOriginal] = useState('')
    const [newValue, setNewValue] = useState('')

    const calculatePercentOf = () => {
        const p = parseFloat(percentOf)
        const n = parseFloat(numberOf)
        if (isNaN(p) || isNaN(n)) return null
        return (n * p) / 100
    }

    const calculatePercentIs = () => {
        const n = parseFloat(numberIs)
        const t = parseFloat(totalIs)
        if (isNaN(n) || isNaN(t) || t === 0) return null
        return (n / t) * 100
    }

    const calculatePercentChange = () => {
        const o = parseFloat(original)
        const n = parseFloat(newValue)
        if (isNaN(o) || isNaN(n) || o === 0) return null
        return ((n - o) / o) * 100
    }

    return (
        <div className="space-y-6">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                    onClick={() => setMode('of')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${mode === 'of'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    X% of Y
                </button>
                <button
                    onClick={() => setMode('is')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${mode === 'is'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    X is what % of Y
                </button>
                <button
                    onClick={() => setMode('increase')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${mode === 'increase'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    % Increase
                </button>
                <button
                    onClick={() => setMode('decrease')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${mode === 'decrease'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    % Decrease
                </button>
            </div>

            {/* What is X% of Y? */}
            {mode === 'of' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        What is X% of Y?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Percentage (X%)
                            </label>
                            <input
                                type="number"
                                value={percentOf}
                                onChange={(e) => setPercentOf(e.target.value)}
                                placeholder="25"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Number (Y)
                            </label>
                            <input
                                type="number"
                                value={numberOf}
                                onChange={(e) => setNumberOf(e.target.value)}
                                placeholder="80"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    {calculatePercentOf() !== null && (
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                            <div className="text-sm text-green-700 dark:text-green-300 mb-2">Result:</div>
                            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                                {calculatePercentOf()?.toFixed(2)}
                            </div>
                            <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                                {percentOf}% of {numberOf} = {calculatePercentOf()?.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* X is what % of Y? */}
            {mode === 'is' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        X is what percentage of Y?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Number (X)
                            </label>
                            <input
                                type="number"
                                value={numberIs}
                                onChange={(e) => setNumberIs(e.target.value)}
                                placeholder="20"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Total (Y)
                            </label>
                            <input
                                type="number"
                                value={totalIs}
                                onChange={(e) => setTotalIs(e.target.value)}
                                placeholder="80"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    {calculatePercentIs() !== null && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                            <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">Result:</div>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                                {calculatePercentIs()?.toFixed(2)}%
                            </div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                                {numberIs} is {calculatePercentIs()?.toFixed(2)}% of {totalIs}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Percentage Increase/Decrease */}
            {(mode === 'increase' || mode === 'decrease') && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Percentage {mode === 'increase' ? 'Increase' : 'Decrease'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Original Value
                            </label>
                            <input
                                type="number"
                                value={original}
                                onChange={(e) => setOriginal(e.target.value)}
                                placeholder="100"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                New Value
                            </label>
                            <input
                                type="number"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                placeholder="125"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    {calculatePercentChange() !== null && (
                        <div className={`rounded-xl p-6 border ${calculatePercentChange()! >= 0
                            ? 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800'
                            : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800'
                            }`}>
                            <div className={`text-sm mb-2 ${calculatePercentChange()! >= 0
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-red-700 dark:text-red-300'
                                }`}>
                                Result:
                            </div>
                            <div className={`text-3xl font-bold ${calculatePercentChange()! >= 0
                                ? 'text-green-900 dark:text-green-100'
                                : 'text-red-900 dark:text-red-100'
                                }`}>
                                {calculatePercentChange()! >= 0 ? '+' : ''}{calculatePercentChange()?.toFixed(2)}%
                            </div>
                            <div className={`text-sm mt-2 ${calculatePercentChange()! >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                                }`}>
                                {calculatePercentChange()! >= 0 ? 'Increase' : 'Decrease'} from {original} to {newValue}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Percentage Basics
                </h3>
                <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                    <li>• Percentage means &quot;per hundred&quot; - 25% = 25/100 = 0.25</li>
                    <li>• To find X% of Y: multiply Y by (X/100)</li>
                    <li>• To find what % X is of Y: divide X by Y and multiply by 100</li>
                    <li>• Percentage change = ((New - Old) / Old) × 100</li>
                </ul>
            </div>
        </div>
    )
}
