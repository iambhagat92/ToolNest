'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, Copy, Check } from 'lucide-react'

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'storage' | 'time'

interface Unit {
    value: string
    label: string
    factor: number // Conversion factor to base unit (except temp)
}

const units: Record<Category, Unit[]> = {
    length: [
        { value: 'm', label: 'Meters (m)', factor: 1 },
        { value: 'km', label: 'Kilometers (km)', factor: 1000 },
        { value: 'cm', label: 'Centimeters (cm)', factor: 0.01 },
        { value: 'mm', label: 'Millimeters (mm)', factor: 0.001 },
        { value: 'in', label: 'Inches (in)', factor: 0.0254 },
        { value: 'ft', label: 'Feet (ft)', factor: 0.3048 },
        { value: 'yd', label: 'Yards (yd)', factor: 0.9144 },
        { value: 'mi', label: 'Miles (mi)', factor: 1609.344 },
    ],
    weight: [
        { value: 'kg', label: 'Kilograms (kg)', factor: 1 },
        { value: 'g', label: 'Grams (g)', factor: 0.001 },
        { value: 'mg', label: 'Milligrams (mg)', factor: 0.000001 },
        { value: 'lb', label: 'Pounds (lb)', factor: 0.45359237 },
        { value: 'oz', label: 'Ounces (oz)', factor: 0.028349523125 },
    ],
    temperature: [
        { value: 'c', label: 'Celsius (°C)', factor: 1 },
        { value: 'f', label: 'Fahrenheit (°F)', factor: 1 },
        { value: 'k', label: 'Kelvin (K)', factor: 1 },
    ],
    area: [
        { value: 'sqm', label: 'Square Meters (m²)', factor: 1 },
        { value: 'sqkm', label: 'Square Kilometers (km²)', factor: 1000000 },
        { value: 'sqft', label: 'Square Feet (ft²)', factor: 0.092903 },
        { value: 'acre', label: 'Acres', factor: 4046.86 },
        { value: 'ha', label: 'Hectares', factor: 10000 },
    ],
    storage: [
        { value: 'b', label: 'Bytes (B)', factor: 1 },
        { value: 'kb', label: 'Kilobytes (KB)', factor: 1024 },
        { value: 'mb', label: 'Megabytes (MB)', factor: 1048576 },
        { value: 'gb', label: 'Gigabytes (GB)', factor: 1073741824 },
        { value: 'tb', label: 'Terabytes (TB)', factor: 1099511627776 },
    ],
    time: [
        { value: 's', label: 'Seconds', factor: 1 },
        { value: 'min', label: 'Minutes', factor: 60 },
        { value: 'h', label: 'Hours', factor: 3600 },
        { value: 'd', label: 'Days', factor: 86400 },
        { value: 'wk', label: 'Weeks', factor: 604800 },
        { value: 'mo', label: 'Months (30d)', factor: 2592000 },
        { value: 'y', label: 'Years (365d)', factor: 31536000 },
    ],
}

export default function UnitConverter() {
    const [category, setCategory] = useState<Category>('length')
    const [fromValue, setFromValue] = useState<string>('1')
    const [toValue, setToValue] = useState<string>('')
    const [fromUnit, setFromUnit] = useState<string>('')
    const [toUnit, setToUnit] = useState<string>('')
    const [copied, setCopied] = useState(false)

    // Set default units when category changes
    useEffect(() => {
        setFromUnit(units[category][0].value)
        setToUnit(units[category][1]?.value || units[category][0].value)
    }, [category])

    // Calculate conversion
    useEffect(() => {
        if (!fromValue || isNaN(Number(fromValue))) {
            setToValue('')
            return
        }

        const input = parseFloat(fromValue)
        let result: number

        if (category === 'temperature') {
            result = convertTemperature(input, fromUnit, toUnit)
        } else {
            const fromFactor = units[category].find(u => u.value === fromUnit)?.factor || 1
            const toFactor = units[category].find(u => u.value === toUnit)?.factor || 1
            const baseValue = input * fromFactor
            result = baseValue / toFactor
        }

        // Format result to avoid long decimals, but keep precision for small numbers
        const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '')
        setToValue(formatted)
    }, [fromValue, fromUnit, toUnit, category])

    const convertTemperature = (value: number, from: string, to: string): number => {
        if (from === to) return value

        let celsius: number

        // Convert to Celsius first
        if (from === 'c') celsius = value
        else if (from === 'f') celsius = (value - 32) * (5 / 9)
        else /* from === 'k' */ celsius = value - 273.15

        // Convert from Celsius to target
        if (to === 'c') return celsius
        if (to === 'f') return (celsius * 9 / 5) + 32
        if (to === 'k') return celsius + 273.15

        return celsius
    }

    const handleCopy = () => {
        if (!toValue) return
        navigator.clipboard.writeText(toValue)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const swapUnits = () => {
        setFromUnit(toUnit)
        setToUnit(fromUnit)
    }

    return (
        <div className="space-y-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                {(Object.keys(units) as Category[]).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${category === cat
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                {/* From Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        From
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter value"
                        />
                    </div>
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                        {units[category].map((unit) => (
                            <option key={unit.value} value={unit.value}>
                                {unit.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center md:pt-6">
                    <button
                        onClick={swapUnits}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                        title="Swap units"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* To Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        To
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={toValue}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-medium text-gray-900 dark:text-gray-100 outline-none cursor-default"
                            placeholder="Result"
                        />
                        {toValue && (
                            <button
                                onClick={handleCopy}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-400 hover:text-primary-500 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all"
                                title="Copy result"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        )}
                    </div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                        {units[category].map((unit) => (
                            <option key={unit.value} value={unit.value}>
                                {unit.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Formula Display (Optional for educational value) */}
            {toValue && category === 'temperature' && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <span className="font-semibold">Formula: </span>
                        {fromUnit === 'c' && toUnit === 'f' && `(${fromValue}°C × 9/5) + 32 = ${toValue}°F`}
                        {fromUnit === 'f' && toUnit === 'c' && `(${fromValue}°F − 32) × 5/9 = ${toValue}°C`}
                        {fromUnit === 'c' && toUnit === 'k' && `${fromValue}°C + 273.15 = ${toValue}K`}
                        {fromUnit === 'k' && toUnit === 'c' && `${fromValue}K − 273.15 = ${toValue}°C`}
                        {/* Add more common formulas if desired */}
                    </p>
                </div>
            )}
        </div>
    )
}
