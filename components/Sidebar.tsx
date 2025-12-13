'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories, tools } from '@/lib/tools-data'
import { getLocalStorage } from '@/lib/utils'
import { Star, Clock, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'

export default function Sidebar() {
    const pathname = usePathname()
    const [pinnedTools, setPinnedTools] = useState<string[]>([])
    const [recentTools, setRecentTools] = useState<string[]>([])

    useEffect(() => {
        setPinnedTools(getLocalStorage('pinnedTools', []))
        setRecentTools(getLocalStorage('recentTools', []))
    }, [])

    const pinnedToolsData = tools.filter((tool) => pinnedTools.includes(tool.id))
    const recentToolsData = tools.filter((tool) =>
        recentTools.slice(0, 5).includes(tool.id)
    )

    return (
        <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto custom-scrollbar">
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
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === `/tools/${tool.slug}`
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
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
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === `/tools/${tool.slug}`
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
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
                    <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Categories
                        </h3>
                    </div>
                    <div className="space-y-1">
                        {categories.map((category) => {
                            const IconComponent = Icons[category.icon as keyof typeof Icons] as any
                            const categoryTools = tools.filter(
                                (tool) => tool.category === category.id
                            )
                            return (
                                <div key={category.id}>
                                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                                        <span>{category.name}</span>
                                        <span className="ml-auto text-xs text-gray-500">
                                            {categoryTools.length}
                                        </span>
                                    </div>
                                    <div className="ml-7 space-y-1">
                                        {categoryTools.map((tool) => (
                                            <Link
                                                key={tool.id}
                                                href={`/tools/${tool.slug}`}
                                                className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${pathname === `/tools/${tool.slug}`
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                    }`}
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
        </aside>
    )
}
