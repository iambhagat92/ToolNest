'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Star, Clock } from 'lucide-react'
import { categories, tools } from '@/lib/tools-data'
import { getLocalStorage } from '@/lib/utils'
import * as Icons from 'lucide-react'

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [pinnedTools, setPinnedTools] = useState<string[]>([])
    const [recentTools, setRecentTools] = useState<string[]>([])

    useEffect(() => {
        setPinnedTools(getLocalStorage('pinnedTools', []))
        setRecentTools(getLocalStorage('recentTools', []))
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const pinnedToolsData = tools.filter((tool) => pinnedTools.includes(tool.id))
    const recentToolsData = tools.filter((tool) =>
        recentTools.slice(0, 5).includes(tool.id)
    )

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-50 overflow-y-auto custom-scrollbar lg:hidden animate-slide-up">
                        <div className="p-4 space-y-6">
                            {/* Pinned Tools */}
                            {pinnedToolsData.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Pinned Tools
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        {pinnedToolsData.map((tool) => {
                                            const IconComponent = Icons[tool.icon as keyof typeof Icons] as any
                                            return (
                                                <Link
                                                    key={tool.id}
                                                    href={`/tools/${tool.slug}`}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">{tool.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Recently Used */}
                            {recentToolsData.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Recently Used
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        {recentToolsData.map((tool) => {
                                            const IconComponent = Icons[tool.icon as keyof typeof Icons] as any
                                            return (
                                                <Link
                                                    key={tool.id}
                                                    href={`/tools/${tool.slug}`}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">{tool.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    All Tools
                                </h3>
                                <div className="space-y-4">
                                    {categories.map((category) => {
                                        const IconComponent = Icons[category.icon as keyof typeof Icons] as any
                                        const categoryTools = tools.filter(
                                            (tool) => tool.category === category.id
                                        )
                                        return (
                                            <div key={category.id}>
                                                <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    <IconComponent className="w-4 h-4" />
                                                    <span>{category.name}</span>
                                                </div>
                                                <div className="ml-6 space-y-1">
                                                    {categoryTools.map((tool) => (
                                                        <Link
                                                            key={tool.id}
                                                            href={`/tools/${tool.slug}`}
                                                            className="block px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
