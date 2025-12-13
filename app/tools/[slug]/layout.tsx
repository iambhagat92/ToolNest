import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getToolBySlug } from '@/lib/tools-data'
import { generateMetadata as genMeta } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const tool = getToolBySlug(params.slug)

    if (!tool) {
        return {}
    }

    return genMeta({
        title: `${tool.name} - Free Online Tool`,
        description: tool.description,
        keywords: tool.keywords,
    })
}

export { default } from './page'
