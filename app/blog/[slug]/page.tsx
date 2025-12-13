import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { Clock, User, Tag, ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {}
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            publishedTime: post.datePublished,
            modifiedTime: post.dateModified || post.datePublished,
            authors: [post.author],
        },
    }
}

export function generateStaticParams() {
    return [
        { slug: 'text-analysis-tools-guide' },
        { slug: 'image-optimization-guide' },
        { slug: 'loan-emi-calculator-guide' },
    ]
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                    Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400">
                    Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-gray-100 truncate">{post.title}</span>
            </div>

            {/* Header */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-soft-lg mb-8">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <span>{formatDate(post.datePublished)}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                .split('\n')
                                .map((line) => {
                                    if (line.startsWith('# ')) {
                                        return `<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">${line.slice(2)}</h1>`
                                    } else if (line.startsWith('## ')) {
                                        return `<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">${line.slice(3)}</h2>`
                                    } else if (line.startsWith('### ')) {
                                        return `<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2">${line.slice(4)}</h3>`
                                    } else if (line.startsWith('**') && line.endsWith('**')) {
                                        return `<p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">${line.slice(2, -2)}</p>`
                                    } else if (line.startsWith('- ')) {
                                        return `<li class="ml-6 mb-1">${line.slice(2)}</li>`
                                    } else if (line.trim() === '') {
                                        return '<br />'
                                    } else if (line.startsWith('```')) {
                                        return line.includes('html') ? '<pre class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 overflow-x-auto"><code>' : '</code></pre>'
                                    } else {
                                        return `<p class="mb-4">${line}</p>`
                                    }
                                })
                                .join(''),
                        }}
                    />
                </div>
            </article>

            {/* Related Tools */}
            {post.relatedTools && post.relatedTools.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Related Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {post.relatedTools.map((toolSlug) => {
                            const tool = require('@/lib/tools-data').tools.find(
                                (t: any) => t.slug === toolSlug
                            )
                            if (!tool) return null

                            const IconComponent = Icons[tool.icon as keyof typeof Icons] as any

                            return (
                                <Link
                                    key={tool.id}
                                    href={`/tools/${tool.slug}`}
                                    className="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-soft-lg hover:-translate-y-1 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                            {tool.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                            {tool.shortDescription}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.excerpt,
                        author: {
                            '@type': 'Person',
                            name: post.author,
                        },
                        datePublished: post.datePublished,
                        dateModified: post.dateModified || post.datePublished,
                        publisher: {
                            '@type': 'Organization',
                            name: 'ToolSphere',
                        },
                    }),
                }}
            />
        </div>
    )
}
