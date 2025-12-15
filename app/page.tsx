'use client'

import { useEffect, useState } from 'react'
import ToolCard from '@/components/ToolCard'
import { tools, categories, getTrendingTools, getRecommendedTools, getToolsByCategory } from '@/lib/tools-data'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'
import { TrendingUp, Star, Clock, Sparkles } from 'lucide-react'
import * as Icons from 'lucide-react'

export default function Home() {
    const [recentToolIds, setRecentToolIds] = useState<string[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setRecentToolIds(getLocalStorage('recentTools', []))
    }, [])

    const trendingTools = getTrendingTools()
    const recommendedTools = getRecommendedTools()
    const recentTools = mounted ? tools.filter((tool) => recentToolIds.slice(0, 6).includes(tool.id)) : []

    return (
        <div className="space-y-12 animate-fade-in">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'WebSite',
                                name: 'ToolSphere',
                                url: 'https://toolsphere.com',
                                potentialAction: {
                                    '@type': 'SearchAction',
                                    target: 'https://toolsphere.com/?q={search_term_string}',
                                    'query-input': 'required name=search_term_string',
                                },
                            },
                            {
                                '@type': 'Organization',
                                name: 'ToolSphere',
                                url: 'https://toolsphere.com',
                                logo: 'https://toolsphere.com/logo.png',
                                sameAs: ['https://twitter.com/toolsphere'],
                            },
                        ],
                    }),
                }}
            />

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                    <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                        Your Premium Tools Dashboard
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="gradient-text">Professional Tools</span>
                    <br />
                    <span className="text-gray-900 dark:text-gray-100">for Every Task</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    Fast, private, and powerful online tools to boost your productivity.
                    No signup required. Completely free.
                </p>
            </div>

            {/* Recently Used Tools */}
            {recentTools.length > 0 && (
                <section className="animate-slide-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Recently Used
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Pick up where you left off
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentTools.map((tool) => (
                            <ToolCard key={tool.id} {...tool} />
                        ))}
                    </div>
                </section>
            )}

            {/* Recommended Tools */}
            <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Recommended for You
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Popular tools to enhance your workflow
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedTools.map((tool) => (
                        <ToolCard key={tool.id} {...tool} />
                    ))}
                </div>
            </section>

            {/* Trending Tools */}
            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Trending Now
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Most popular tools this week
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingTools.map((tool) => (
                        <ToolCard key={tool.id} {...tool} />
                    ))}
                </div>
            </section>

            {/* All Tools by Category */}
            <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Browse All Tools
                </h2>
                <div className="space-y-12">
                    {categories.map((category) => {
                        const categoryTools = getToolsByCategory(category.id)
                        if (categoryTools.length === 0) return null

                        const IconComponent = Icons[category.icon as keyof typeof Icons] as any

                        return (
                            <div key={category.id}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'} available
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryTools.map((tool) => (
                                        <ToolCard key={tool.id} {...tool} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
