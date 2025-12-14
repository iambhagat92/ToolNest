import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './providers'
import ThemeToggle from '@/components/ThemeToggle'
import Sidebar from '@/components/Sidebar'
import MobileMenu from '@/components/MobileMenu'
import ToolSearch from '@/components/ToolSearch'
import { Sparkles } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'ToolSphere - Premium Online Tools Dashboard',
        template: '%s | ToolSphere',
    },
    description: 'Professional web tools for productivity. Word counter, case converter, image compressor, loan calculator, and more. Fast, private, and free.',
    keywords: ['online tools', 'web tools', 'productivity', 'word counter', 'text tools', 'image tools', 'calculators'],
    authors: [{ name: 'ToolSphere Team' }],
    creator: 'ToolSphere',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://toolsphere.com',
        title: 'ToolSphere - Premium Online Tools Dashboard',
        description: 'Professional web tools for productivity',
        siteName: 'ToolSphere',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ToolSphere - Premium Online Tools Dashboard',
        description: 'Professional web tools for productivity',
    },
    metadataBase: new URL('https://toolsphere.com'),
    alternates: {
        canonical: '/',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                        {/* Header */}
                        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    {/* Mobile Menu Toggle */}
                                    <MobileMenu />

                                    {/* Logo */}
                                    <Link href="/" className="flex items-center gap-2 group">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xl font-bold gradient-text hidden sm:inline">
                                            ToolSphere
                                        </span>
                                    </Link>

                                    {/* Desktop Search */}
                                    <div className="hidden lg:block flex-1 max-w-md">
                                        <ToolSearch />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Navigation Links */}
                                    <nav className="hidden md:flex items-center gap-6">
                                        <Link
                                            href="/"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/blog"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            Blog
                                        </Link>
                                    </nav>

                                    <ThemeToggle />
                                </div>
                            </div>

                            {/* Mobile Search */}
                            <div className="lg:hidden px-4 pb-3">
                                <ToolSearch />
                            </div>
                        </header>

                        <div className="flex">
                            {/* Desktop Sidebar */}
                            <Sidebar />

                            {/* Main Content */}
                            <main className="flex-1 lg:ml-64">
                                <div className="container mx-auto px-4 py-8">
                                    {children}
                                </div>
                            </main>
                        </div>

                        {/* Footer */}
                        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 lg:ml-64">
                            <div className="container mx-auto px-4 py-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4">ToolSphere</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Professional online tools for productivity. Fast, private, and completely free.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                    Blog
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4">Legal</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                    Terms of Service
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
                                    © 2024 ToolSphere. All rights reserved.
                                </div>
                            </div>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
