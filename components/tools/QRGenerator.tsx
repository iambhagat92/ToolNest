'use client'

import { useState, useRef, useEffect } from 'react'
import { Download } from 'lucide-react'

export default function QRGenerator() {
    const [text, setText] = useState('')
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [size, setSize] = useState(256)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const generateQR = async () => {
        if (!text.trim()) {
            setQrCodeUrl('')
            return
        }

        try {
            const QRCode = (await import('qrcode')).default
            const canvas = canvasRef.current
            if (canvas) {
                await QRCode.toCanvas(canvas, text, {
                    width: size,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                    },
                })
                setQrCodeUrl(canvas.toDataURL())
            }
        } catch (error) {
            console.error('QR generation error:', error)
        }
    }

    useEffect(() => {
        if (text) {
            generateQR()
        }
    }, [text, size])

    const downloadQR = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a')
            link.href = qrCodeUrl
            link.download = `qrcode-${Date.now()}.png`
            link.click()
        }
    }

    return (
        <div className="space-y-6">
            {/* Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text or URL to Encode
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text, URL, or any data to convert to QR code..."
                    className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
            </div>

            {/* Size Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    QR Code Size: {size}x{size} pixels
                </label>
                <input
                    type="range"
                    min="128"
                    max="512"
                    step="64"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>128px</span>
                    <span>512px</span>
                </div>
            </div>

            {/* QR Code Preview */}
            {text && (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-soft-lg border border-gray-200">
                        <canvas ref={canvasRef} className="max-w-full" />
                    </div>

                    <button
                        onClick={downloadQR}
                        disabled={!qrCodeUrl}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download QR Code
                    </button>
                </div>
            )}

            {!text && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter text or URL above to generate QR code
                    </p>
                </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    QR Code Tips
                </h3>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Larger QR codes scan more reliably from a distance</li>
                    <li>• Test your QR code with multiple devices before printing</li>
                    <li>• Ensure good contrast between background and QR code</li>
                    <li>• Leave white space around the QR code (at least 4x module width)</li>
                    <li>• Use high resolution for print materials (300 DPI or higher)</li>
                </ul>
            </div>
        </div>
    )
}
