import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Database, Eye, Cookie, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how ToolSphere protects your privacy. All tools run client-side with zero data collection or tracking.',
    alternates: {
        canonical: '/privacy',
    },
}

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6">
                    <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                    Privacy Policy
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Last updated: December 14, 2024
                </p>
            </div>

            {/* Main Content */}
            <div className="card space-y-8">
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        Our Commitment to Privacy
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        At ToolSphere, we take your privacy seriously. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our website and tools.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Client-Side Processing */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        Client-Side Processing
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        All ToolSphere tools operate entirely in your browser. This means:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Your data never leaves your device</li>
                        <li>We do not upload, store, or transmit any of your content to our servers</li>
                        <li>All processing happens locally in your browser</li>
                        <li>You maintain complete control over your data</li>
                    </ul>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Information We Collect */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        Information We Collect
                    </h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        We do not collect, store, or process any personal information. We do not require account creation, email addresses, or any identifying information to use our tools.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Usage Data</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        We may collect basic, anonymized usage statistics through our hosting provider, which may include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Page views and visit duration</li>
                        <li>Browser type and version</li>
                        <li>Device type and operating system</li>
                        <li>Referring website</li>
                        <li>General geographic location (country/region level only)</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                        This data is aggregated and anonymized, and cannot be used to identify individual users.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Local Storage */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        Local Storage & Cookies
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        We use browser localStorage to enhance your experience by saving:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Your theme preference (light/dark mode)</li>
                        <li>Recently used tools</li>
                        <li>Pinned tools</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                        This data is stored locally on your device and is never transmitted to our servers. You can clear this data at any time through your browser settings.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                        We do not use cookies for tracking or advertising purposes.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Third-Party Services */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        Third-Party Services
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        We use minimal third-party services to operate ToolSphere:
                    </p>
                    <ul className="space-y-3 ml-4">
                        <li className="text-gray-700 dark:text-gray-300">
                            <strong>Hosting:</strong> Our website is hosted on Vercel. Their privacy policy is available at{' '}
                            <a
                                href="https://vercel.com/legal/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                vercel.com/legal/privacy-policy
                            </a>
                        </li>
                        <li className="text-gray-700 dark:text-gray-300">
                            <strong>Google Fonts:</strong> We use Google Fonts for typography. This may send your IP address to Google. Their privacy policy is available at{' '}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                policies.google.com/privacy
                            </a>
                        </li>
                    </ul>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Data Security */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Since we operate entirely client-side and do not collect personal data, there is minimal risk to your privacy. All data you input into our tools stays on your device. We use HTTPS encryption to ensure secure communication between your browser and our servers.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Children's Privacy */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our services are available to users of all ages. Since we do not collect personal information, our services are safe for children to use. However, we recommend parental supervision for young users.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Your Rights */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Since we do not collect or store personal data, there is no data for us to modify or delete. You maintain complete control over any data stored locally in your browser, which you can clear at any time through your browser settings.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Changes to This Policy */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        If you have any questions about this Privacy Policy, please feel free to reach out to us through our{' '}
                        <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
                            contact page
                        </Link>.
                    </p>
                </section>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    )
}
