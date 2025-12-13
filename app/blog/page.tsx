import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { Clock, Tag } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog - Expert Guides & Tutorials',
    description: 'Learn how to use online tools effectively with our expert guides, tutorials, and productivity tips.',
    keywords: ['productivity blog', 'tool tutorials', 'how-to guides', 'online tools'],
}

export default function BlogPage() {
    const posts = getAllBlogPosts()

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Blog
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Expert guides, tutorials, and tips to boost your productivity
                </p>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                    >
                        <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{post.category}</span>
                                </div>
                                <span>•</span>
                                <span>{formatDate(post.datePublished)}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {post.title}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                                    Read full article →
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-500">
                                    By {post.author}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}
