import { Metadata } from 'next'

export interface SEOConfig {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
    noIndex?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
    const { title, description, keywords, ogImage, noIndex } = config

    return {
        title,
        description,
        keywords: keywords?.join(', '),
        openGraph: {
            title,
            description,
            images: ogImage ? [{ url: ogImage }] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImage ? [ogImage] : [],
        },
        robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    }
}

export interface FAQItem {
    question: string
    answer: string
}

export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

export interface ToolSchema {
    name: string
    description: string
    url: string
}

export function generateToolSchema(tool: ToolSchema) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        url: tool.url,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    }
}

export interface BlogPostSchema {
    title: string
    description: string
    author: string
    datePublished: string
    dateModified?: string
    image?: string
    url: string
}

export function generateBlogPostSchema(post: BlogPostSchema) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        datePublished: post.datePublished,
        dateModified: post.dateModified || post.datePublished,
        image: post.image,
        url: post.url,
        publisher: {
            '@type': 'Organization',
            name: 'ToolSphere',
        },
    }
}
