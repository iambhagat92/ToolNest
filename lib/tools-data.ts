import { FAQItem } from './seo'

export interface Tool {
    id: string
    name: string
    slug: string
    description: string
    shortDescription: string
    category: string
    icon: string
    keywords: string[]
    faqs: FAQItem[]
    relatedTools: string[]
    trending?: boolean
    recommended?: boolean
}

export const categories = [
    { id: 'text', name: 'Text Tools', icon: 'Type' },
    { id: 'image', name: 'Image Tools', icon: 'Image' },
    { id: 'calculator', name: 'Calculators', icon: 'Calculator' },
    { id: 'converter', name: 'Converters', icon: 'RefreshCw' },
    { id: 'generator', name: 'Generators', icon: 'Sparkles' },
]

export const tools: Tool[] = [
    {
        id: 'word-counter',
        name: 'Word Counter',
        slug: 'word-counter',
        description: 'Professional word counter and text analyzer. Count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and content creators who need accurate text statistics.',
        shortDescription: 'Count words, characters, sentences, and paragraphs in real-time',
        category: 'text',
        icon: 'FileText',
        keywords: ['word count', 'character count', 'text analysis', 'writing tool', 'content length'],
        trending: true,
        recommended: true,
        faqs: [
            {
                question: 'How accurate is the word counter?',
                answer: 'Our word counter uses advanced algorithms to accurately count words by identifying spaces and punctuation. It handles multiple languages and special characters correctly.',
            },
            {
                question: 'Does the word counter save my text?',
                answer: 'No, all text remains in your browser for privacy. We do not store or transmit any of your content to our servers.',
            },
            {
                question: 'Can I use this for academic writing?',
                answer: 'Absolutely! The word counter is perfect for essays, research papers, and meeting word count requirements for academic assignments.',
            },
        ],
        relatedTools: ['case-converter'],
    },
    {
        id: 'case-converter',
        name: 'Text Case Converter',
        slug: 'case-converter',
        description: 'Transform text between different cases instantly. Convert to uppercase, lowercase, title case, sentence case, and camelCase. Essential tool for developers, writers, and content editors.',
        shortDescription: 'Convert text between uppercase, lowercase, title case, and more',
        category: 'text',
        icon: 'Type',
        keywords: ['case converter', 'text transform', 'uppercase', 'lowercase', 'title case'],
        trending: true,
        faqs: [
            {
                question: 'What case formats are supported?',
                answer: 'We support uppercase, lowercase, title case, sentence case, camelCase, and alternating case transformations.',
            },
            {
                question: 'How does title case work?',
                answer: 'Title case capitalizes the first letter of each major word while keeping articles and prepositions lowercase according to standard style guides.',
            },
        ],
        relatedTools: ['word-counter'],
    },
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        slug: 'image-compressor',
        description: 'Compress and optimize images without losing quality. Reduce file sizes for faster website loading. Supports JPEG, PNG, and WebP formats with adjustable quality settings.',
        shortDescription: 'Compress images to reduce file size while maintaining quality',
        category: 'image',
        icon: 'Image',
        keywords: ['image compression', 'optimize images', 'reduce file size', 'web performance'],
        recommended: true,
        faqs: [
            {
                question: 'Is the image compression done on my device?',
                answer: 'Yes, all image processing happens directly in your browser. Your images never leave your device, ensuring complete privacy.',
            },
            {
                question: 'What image formats are supported?',
                answer: 'We support JPEG, PNG, and WebP formats. You can compress multiple images simultaneously.',
            },
            {
                question: 'Will compression reduce image quality?',
                answer: 'You control the quality level. Higher compression reduces file size more but may affect quality. We recommend starting at 80% quality for a good balance.',
            },
        ],
        relatedTools: [],
    },
    {
        id: 'loan-calculator',
        name: 'Loan EMI Calculator',
        slug: 'loan-calculator',
        description: 'Calculate loan EMI (Equated Monthly Installment) with detailed amortization schedule. Perfect for home loans, car loans, and personal loans. Get instant calculations with interest breakdown.',
        shortDescription: 'Calculate monthly loan payments and view amortization schedule',
        category: 'calculator',
        icon: 'Calculator',
        keywords: ['loan calculator', 'EMI calculator', 'mortgage calculator', 'interest calculator'],
        trending: true,
        recommended: true,
        faqs: [
            {
                question: 'What is EMI?',
                answer: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay every month to repay your loan, including principal and interest.',
            },
            {
                question: 'How is EMI calculated?',
                answer: 'EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is principal, R is monthly interest rate, and N is tenure in months.',
            },
            {
                question: 'Can I see the full payment breakdown?',
                answer: 'Yes, our calculator provides a detailed amortization schedule showing principal and interest components for each payment.',
            },
        ],
        relatedTools: [],
    },
]

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((tool) => tool.slug === slug)
}

export function getToolsByCategory(category: string): Tool[] {
    return tools.filter((tool) => tool.category === category)
}

export function getTrendingTools(): Tool[] {
    return tools.filter((tool) => tool.trending)
}

export function getRecommendedTools(): Tool[] {
    return tools.filter((tool) => tool.recommended)
}

export function searchTools(query: string): Tool[] {
    const lowerQuery = query.toLowerCase()

    return tools.filter((tool) => {
        const searchableText = [
            tool.name,
            tool.description,
            tool.shortDescription,
            ...tool.keywords,
        ].join(' ').toLowerCase()

        return searchableText.includes(lowerQuery)
    })
}

export const searchIntents = [
    { keywords: ['count', 'words', 'characters', 'text length'], toolSlug: 'word-counter' },
    { keywords: ['uppercase', 'lowercase', 'capitalize', 'case'], toolSlug: 'case-converter' },
    { keywords: ['compress', 'optimize', 'reduce size', 'image'], toolSlug: 'image-compressor' },
    { keywords: ['loan', 'emi', 'mortgage', 'payment', 'interest'], toolSlug: 'loan-calculator' },
]
