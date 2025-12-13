'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQItem } from '@/lib/seo'

interface FAQAccordionProps {
    faqs: FAQItem[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="space-y-3">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            aria-expanded={isOpen}
                        >
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 pr-4">
                                {faq.question}
                            </h3>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 animate-slide-down">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
