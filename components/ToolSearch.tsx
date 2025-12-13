'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { searchTools, searchIntents, tools } from '@/lib/tools-data'
import { debounce } from '@/lib/utils'
import * as Icons from 'lucide-react'

export default function ToolSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<typeof tools>([])
    const [isOpen, setIsOpen] = useState(false)

    const performSearch = debounce((searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([])
            setIsOpen(false)
            return
        }

        const lowerQuery = searchQuery.toLowerCase()

        const intentMatch = searchIntents.find((intent) =>
            intent.keywords.some((keyword) => lowerQuery.includes(keyword))
        )

        if (intentMatch) {
            const intentTool = tools.find((tool) => tool.slug === intentMatch.toolSlug)
            if (intentTool) {
                const otherResults = searchTools(searchQuery).filter(
                    (tool) => tool.id !== intentTool.id
                )
                setResults([intentTool, ...otherResults])
                setIsOpen(true)
                return
            }
        }

        const searchResults = searchTools(searchQuery)
        setResults(searchResults)
        setIsOpen(searchResults.length > 0)
    }, 300)

    useEffect(() => {
        performSearch(query)
    }, [query])

    const handleClear = () => {
        setQuery('')
        setResults([])
        setIsOpen(false)
    }

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setIsOpen(true)}
                    placeholder="Search tools or describe what you need..."
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <>
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-soft-lg border border-gray-200 dark:border-gray-700 z-40 max-h-96 overflow-y-auto custom-scrollbar animate-slide-down">
                        <div className="p-2">
                            {results.map((tool, index) => {
                                const IconComponent = Icons[tool.icon as keyof typeof Icons] as any
                                return (
                                    <Link
                                        key={tool.id}
                                        href={`/tools/${tool.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                    {tool.name}
                                                </h4>
                                                {index === 0 && results.length > 1 && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium">
                                                        Best match
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                                {tool.shortDescription}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
