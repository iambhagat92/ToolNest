'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Tool } from '@/lib/tools-data'
import FAQAccordion from './FAQAccordion'
import { ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'

interface ToolWorkspaceProps {
    tool: Tool
    children: ReactNode
}

export default function ToolWorkspace({ tool, children }: ToolWorkspaceProps) {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-gray-100">{tool.name}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {tool.name}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                </p>
            </div>

            {/* Tool Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
                {children}
            </div>

            {/* FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <FAQAccordion faqs={tool.faqs} />
                </div>
            )}

            {/* Related Tools */}
            {tool.relatedTools && tool.relatedTools.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Related Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tool.relatedTools.map((relatedSlug) => {
                            const relatedTool = require('@/lib/tools-data').tools.find(
                                (t: Tool) => t.slug === relatedSlug
                            )
                            if (!relatedTool) return null

                            const IconComponent = Icons[relatedTool.icon as keyof typeof Icons] as any

                            return (
                                <Link
                                    key={relatedTool.id}
                                    href={`/tools/${relatedTool.slug}`}
                                    className="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-soft-lg hover:-translate-y-1 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                            {relatedTool.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                            {relatedTool.shortDescription}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
