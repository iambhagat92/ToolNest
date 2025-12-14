import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms and conditions for using ToolSphere tools and services.',
    alternates: {
        canonical: '/terms',
    },
}

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6">
                    <FileText className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                    Terms of Service
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
                            <Scale className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        Agreement to Terms
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        By accessing and using ToolSphere (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Use of Service */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        Use of Service
                    </h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Permitted Use</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        You may use ToolSphere for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Personal productivity and work-related tasks</li>
                        <li>Educational purposes</li>
                        <li>Commercial projects (you retain full ownership of your outputs)</li>
                        <li>Any lawful purpose</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Free Service</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        ToolSphere is provided free of charge. We reserve the right to introduce premium features or subscriptions in the future, but core functionality will remain free.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Prohibited Activities */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        Prohibited Activities
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        You agree NOT to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Use the Service for any illegal or unauthorized purpose</li>
                        <li>Attempt to gain unauthorized access to the Service or its systems</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Use automated tools (bots, scrapers) to access the Service excessively</li>
                        <li>Copy, modify, or distribute the Service&apos;s code without permission</li>
                        <li>Remove, obscure, or alter any copyright or proprietary notices</li>
                        <li>Use the Service to transmit malware, viruses, or harmful code</li>
                        <li>Impersonate ToolSphere or claim affiliation without authorization</li>
                    </ul>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Intellectual Property */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Our Content</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        The Service, including its design, code, features, and content, is owned by ToolSphere and protected by copyright, trademark, and other intellectual property laws. All rights not expressly granted are reserved.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Your Content</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        You retain full ownership of any content you input into our tools. Since all processing happens client-side, we never access, store, or claim any rights to your data.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Disclaimer of Warranties */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        Disclaimer of Warranties
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Warranties of merchantability or fitness for a particular purpose</li>
                        <li>Warranties that the Service will be uninterrupted, error-free, or secure</li>
                        <li>Warranties regarding the accuracy or reliability of results</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                        While we strive to provide accurate and reliable tools, we do not guarantee that the results will always be error-free or suitable for your specific needs. Always verify critical outputs independently.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Limitation of Liability */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL TOOLSPHERE, ITS AFFILIATES, OR THEIR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-4">
                        <li>Your use or inability to use the Service</li>
                        <li>Any unauthorized access to or use of our servers</li>
                        <li>Any bugs, viruses, or harmful code transmitted through the Service</li>
                        <li>Any errors or omissions in any content</li>
                        <li>Any reliance on results generated by our tools</li>
                    </ul>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Indemnification */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        You agree to indemnify, defend, and hold harmless ToolSphere and its affiliates from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Service, or your violation of these Terms.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Third-Party Links */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        The Service may contain links to third-party websites or services that are not owned or controlled by ToolSphere. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Changes to Service */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Changes to Service</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Termination */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Termination</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Governing Law */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ToolSphere operates, without regard to its conflict of law provisions.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Changes to Terms */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page with an updated &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Severability */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Severability</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                    </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        Contact Us
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        If you have any questions about these Terms of Service, please feel free to reach out to us through our{' '}
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
