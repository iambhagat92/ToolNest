'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'
import * as Icons from 'lucide-react'

interface ToolCardProps {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    category: string
    trending?: boolean
    recommended?: boolean
}

export default function ToolCard({
    id,
    name,
    slug,
    description,
    icon,
    trending,
    recommended,
}: ToolCardProps) {
    const [isPinned, setIsPinned] = useState(false)

    useEffect(() => {
        const pinnedTools = getLocalStorage<string[]>('pinnedTools', [])
        setIsPinned(pinnedTools.includes(id))
    }, [id])

    const handleTogglePin = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const pinnedTools = getLocalStorage<string[]>('pinnedTools', [])

        if (isPinned) {
            const updated = pinnedTools.filter((toolId) => toolId !== id)
            setLocalStorage('pinnedTools', updated)
            setIsPinned(false)
        } else {
            setLocalStorage('pinnedTools', [...pinnedTools, id])
            setIsPinned(true)
        }

        window.dispatchEvent(new Event('storage'))
    }

    const IconComponent = Icons[icon as keyof typeof Icons] as any

    return (
        <Link href={`/tools/${slug}`}>
            <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                    {trending && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium">
                            Trending
                        </span>
                    )}
                    {recommended && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium">
                            Recommended
                        </span>
                    )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                        Open Tool →
                    </span>
                    <button
                        onClick={handleTogglePin}
                        className={`p-2 rounded-lg transition-all ${isPinned
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                            }`}
                        aria-label={isPinned ? 'Unpin tool' : 'Pin tool'}
                    >
                        <Star
                            className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`}
                        />
                    </button>
                </div>
            </div>
        </Link>
    )
}
