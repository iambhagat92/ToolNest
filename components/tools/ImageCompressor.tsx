'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon } from 'lucide-react'

export default function ImageCompressor() {
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [compressedImage, setCompressedImage] = useState<string | null>(null)
    const [quality, setQuality] = useState(80)
    const [originalSize, setOriginalSize] = useState(0)
    const [compressedSize, setCompressedSize] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setOriginalSize(file.size)
        const reader = new FileReader()
        reader.onload = (event) => {
            const img = event.target?.result as string
            setOriginalImage(img)
            compressImage(img, quality)
        }
        reader.readAsDataURL(file)
    }

    const compressImage = (imageSrc: string, qualityValue: number) => {
        setIsProcessing(true)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            ctx.drawImage(img, 0, 0)

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        setCompressedSize(blob.size)
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            setCompressedImage(e.target?.result as string)
                            setIsProcessing(false)
                        }
                        reader.readAsDataURL(blob)
                    }
                },
                'image/jpeg',
                qualityValue / 100
            )
        }
        img.src = imageSrc
    }

    const handleQualityChange = (newQuality: number) => {
        setQuality(newQuality)
        if (originalImage) {
            compressImage(originalImage, newQuality)
        }
    }

    const handleDownload = () => {
        if (!compressedImage) return
        const link = document.createElement('a')
        link.href = compressedImage
        link.download = `compressed-image-q${quality}.jpg`
        link.click()
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    const compressionPercent = originalSize > 0
        ? Math.round((1 - compressedSize / originalSize) * 100)
        : 0

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            {!originalImage ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Click to upload image
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Supports JPEG, PNG, and WebP formats
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
            ) : (
                <>
                    {/* Quality Slider */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Quality: {quality}%
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={quality}
                            onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                            <span>Smaller file</span>
                            <span>Better quality</span>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatFileSize(originalSize)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Original Size
                            </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatFileSize(compressedSize)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Compressed Size
                            </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {compressionPercent}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Size Reduction
                            </div>
                        </div>
                    </div>

                    {/* Image Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Original
                            </h3>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Compressed {isProcessing && <span className="text-sm text-gray-500">(Processing...)</span>}
                            </h3>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                {compressedImage && (
                                    <img src={compressedImage} alt="Compressed" className="max-w-full max-h-full object-contain" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                            Upload New Image
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={!compressedImage}
                            className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Compressed
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </>
            )}

            {/* Expert Tips */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                    <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                            Compression Tips
                        </h3>
                        <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                            <li>• For web use: 80-85% quality offers best balance</li>
                            <li>• Product images: Use 90-95% quality to preserve details</li>
                            <li>• All processing happens locally - your images never leave your device</li>
                            <li>• Combine with proper image dimensions for maximum optimization</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
