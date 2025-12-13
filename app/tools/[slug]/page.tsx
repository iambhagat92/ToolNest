'use client'

import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools-data'
import { setLocalStorage, getLocalStorage } from '@/lib/utils'
import ToolWorkspace from '@/components/ToolWorkspace'
import WordCounter from '@/components/tools/WordCounter'
import CaseConverter from '@/components/tools/CaseConverter'
import ImageCompressor from '@/components/tools/ImageCompressor'
import LoanCalculator from '@/components/tools/LoanCalculator'

const toolComponents: Record<string, React.ComponentType> = {
    'word-counter': WordCounter,
    'case-converter': CaseConverter,
    'image-compressor': ImageCompressor,
    'loan-calculator': LoanCalculator,
}

export function generateStaticParams() {
    return [
        { slug: 'word-counter' },
        { slug: 'case-converter' },
        { slug: 'image-compressor' },
        { slug: 'loan-calculator' },
    ]
}

export default function ToolPage({ params }: { params: { slug: string } }) {
    const tool = getToolBySlug(params.slug)

    useEffect(() => {
        if (tool) {
            const recentTools = getLocalStorage<string[]>('recentTools', [])
            const updated = [tool.id, ...recentTools.filter((id) => id !== tool.id)].slice(0, 10)
            setLocalStorage('recentTools', updated)
            window.dispatchEvent(new Event('storage'))
        }
    }, [tool])

    if (!tool) {
        notFound()
    }

    const ToolComponent = toolComponents[params.slug]

    if (!ToolComponent) {
        notFound()
    }

    return (
        <div className="animate-fade-in">
            <ToolWorkspace tool={tool}>
                <ToolComponent />
            </ToolWorkspace>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: tool.name,
                        description: tool.description,
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Web Browser',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                    }),
                }}
            />

            {/* FAQ Schema */}
            {tool.faqs && tool.faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: tool.faqs.map((faq) => ({
                                '@type': 'Question',
                                name: faq.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: faq.answer,
                                },
                            })),
                        }),
                    }}
                />
            )}
        </div>
    )
}
