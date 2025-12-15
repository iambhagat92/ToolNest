'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

// Helper functions
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null
}

const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    let h = 0,
        s,
        l = (max + min) / 2

    if (max === min) {
        h = s = 0 // achromatic
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

export default function ColorConverter() {
    const [color, setColor] = useState('#0ea5e9') // Initial primary color
    const [rgb, setRgb] = useState({ r: 14, g: 165, b: 233 })
    const [hsl, setHsl] = useState({ h: 199, s: 89, l: 48 })
    const [copied, setCopied] = useState<string | null>(null)

    // Update derived values when color changes (if valid hex)
    useEffect(() => {
        const rgbVal = hexToRgb(color)
        if (rgbVal) {
            setRgb(rgbVal)
            setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b))
        }
    }, [color])

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    const handleRgbChange = (key: 'r' | 'g' | 'b', value: string) => {
        const num = parseInt(value) || 0
        const newRgb = { ...rgb, [key]: Math.min(255, Math.max(0, num)) }
        setRgb(newRgb)
        setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    }

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Visual Picker Side */}
            <div className="space-y-6">
                <div
                    className="aspect-video w-full rounded-2xl shadow-inner flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: color }}
                >
                    <p className="px-4 py-2 bg-white/90 dark:bg-black/50 rounded-lg backdrop-blur text-sm font-mono font-medium">
                        {color.toUpperCase()}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Visual Picker
                    </label>
                    <input
                        type="color"
                        value={color.length === 7 ? color : '#000000'}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
                    />
                </div>
            </div>

            {/* Values Side */}
            <div className="space-y-6">
                {/* HEX Input */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-500">HEX</span>
                        <button
                            onClick={() => copyToClipboard(color, 'hex')}
                            className="text-primary-600 hover:text-primary-700 text-xs flex items-center gap-1"
                        >
                            {copied === 'hex' ? (
                                <>
                                    <Check className="w-3 h-3" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" /> Copy
                                </>
                            )}
                        </button>
                    </div>
                    <input
                        type="text"
                        value={color}
                        onChange={handleHexChange}
                        className="w-full bg-transparent text-xl font-mono font-bold outline-none uppercase"
                    />
                </div>

                {/* RGB Input */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-500">RGB</span>
                        <button
                            onClick={() =>
                                copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')
                            }
                            className="text-primary-600 hover:text-primary-700 text-xs flex items-center gap-1"
                        >
                            {copied === 'rgb' ? (
                                <>
                                    <Check className="w-3 h-3" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" /> Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {['r', 'g', 'b'].map((channel) => (
                            <div key={channel} className="text-center">
                                <label className="block text-xs uppercase text-gray-400 mb-1">
                                    {channel}
                                </label>
                                <input
                                    type="number"
                                    value={rgb[channel as keyof typeof rgb]}
                                    onChange={(e) =>
                                        handleRgbChange(channel as any, e.target.value)
                                    }
                                    className="w-full text-center bg-white dark:bg-gray-800 rounded-lg py-2 border border-gray-200 dark:border-gray-700 font-mono"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* HSL Display */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-500">HSL</span>
                        <button
                            onClick={() =>
                                copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')
                            }
                            className="text-primary-600 hover:text-primary-700 text-xs flex items-center gap-1"
                        >
                            {copied === 'hsl' ? (
                                <>
                                    <Check className="w-3 h-3" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" /> Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center font-mono text-lg">
                        <div>
                            {hsl.h}°<span className="block text-xs text-gray-400">Hue</span>
                        </div>
                        <div>
                            {hsl.s}%<span className="block text-xs text-gray-400">Sat</span>
                        </div>
                        <div>
                            {hsl.l}%<span className="block text-xs text-gray-400">Light</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
