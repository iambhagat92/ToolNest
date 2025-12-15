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
    {
        id: 'password-generator',
        name: 'Password Generator',
        slug: 'password-generator',
        description: 'Generate secure, random passwords with customizable options. Create strong passwords with uppercase, lowercase, numbers, and special characters. Perfect for securing your accounts with unique, hard-to-crack passwords.',
        shortDescription: 'Generate strong, secure random passwords instantly',
        category: 'generator',
        icon: 'Lock',
        keywords: ['password generator', 'secure password', 'random password', 'password strength', 'account security'],
        trending: true,
        recommended: true,
        faqs: [
            {
                question: 'How secure are the generated passwords?',
                answer: 'Our password generator uses cryptographically secure random number generation to create truly random passwords. The passwords are generated entirely in your browser and never sent to our servers.',
            },
            {
                question: 'What makes a strong password?',
                answer: 'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using dictionary words or personal information.',
            },
            {
                question: 'Can I customize the password length?',
                answer: 'Yes, you can generate passwords from 8 to 128 characters in length and choose which character types to include.',
            },
        ],
        relatedTools: ['base64-tool'],
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter & Validator',
        slug: 'json-formatter',
        description: 'Format, beautify, and validate JSON data instantly. Minify JSON for production, validate syntax with detailed error messages, and improve code readability. Essential tool for developers working with APIs and data.',
        shortDescription: 'Format, validate, and minify JSON code',
        category: 'converter',
        icon: 'Code',
        keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json parser'],
        trending: true,
        faqs: [
            {
                question: 'What does JSON formatting do?',
                answer: 'JSON formatting adds proper indentation and line breaks to make JSON data more readable. It helps developers quickly understand the structure of complex data.',
            },
            {
                question: 'Can this tool validate JSON?',
                answer: 'Yes, our tool validates JSON syntax and shows detailed error messages with line numbers if there are any issues.',
            },
            {
                question: 'What is JSON minification?',
                answer: 'JSON minification removes all unnecessary whitespace and line breaks to reduce file size, which is ideal for production environments and API responses.',
            },
        ],
        relatedTools: ['base64-tool', 'url-tool'],
    },
    {
        id: 'qr-generator',
        name: 'QR Code Generator',
        slug: 'qr-generator',
        description: 'Create QR codes from text, URLs, or any data instantly. Generate high-quality QR codes with customizable sizes for websites, business cards, products, and marketing materials. Download as PNG images.',
        shortDescription: 'Generate QR codes from text or URLs',
        category: 'image',
        icon: 'QrCode',
        keywords: ['qr code generator', 'qr code maker', 'create qr code', 'barcode generator', 'scan code'],
        recommended: true,
        faqs: [
            {
                question: 'What can I encode in a QR code?',
                answer: 'You can encode any text, URLs, contact information, WiFi credentials, or plain text up to several thousand characters.',
            },
            {
                question: 'Are the QR codes free to use?',
                answer: 'Yes, all QR codes generated are completely free to use for personal or commercial purposes without any limitations.',
            },
            {
                question: 'What size should my QR code be?',
                answer: 'For print materials, we recommend at least 2cm x 2cm (about 0.8 inches). For digital use, 200x200 pixels minimum. Larger QR codes scan more reliably.',
            },
        ],
        relatedTools: ['image-compressor'],
    },
    {
        id: 'percentage-calculator',
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate percentages quickly and accurately. Find what percentage one number is of another, calculate percentage increases and decreases, and solve various percentage problems. Perfect for business, finance, and everyday calculations.',
        shortDescription: 'Calculate percentages, increases, and decreases',
        category: 'calculator',
        icon: 'Percent',
        keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percentage decrease', 'calculate percent'],
        trending: true,
        faqs: [
            {
                question: 'How do I calculate a percentage of a number?',
                answer: 'To find X% of Y, multiply Y by X and divide by 100. For example, 25% of 80 is (80 × 25) / 100 = 20.',
            },
            {
                question: 'What is the difference between percentage increase and decrease?',
                answer: 'Percentage increase shows how much a value has grown, while percentage decrease shows how much it has reduced, both relative to the original value.',
            },
            {
                question: 'Can I calculate percentage difference?',
                answer: 'Yes, our calculator can find the percentage difference between two numbers using multiple calculation modes.',
            },
        ],
        relatedTools: ['loan-calculator'],
    },
    {
        id: 'base64-tool',
        name: 'Base64 Encoder/Decoder',
        slug: 'base64-tool',
        description: 'Encode and decode Base64 data instantly. Convert text to Base64 encoding or decode Base64 strings back to readable text. Essential tool for developers working with data encoding, APIs, and web development.',
        shortDescription: 'Encode and decode Base64 text',
        category: 'converter',
        icon: 'Binary',
        keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64', 'base64 converter'],
        recommended: true,
        faqs: [
            {
                question: 'What is Base64 encoding?',
                answer: 'Base64 is a encoding scheme that represents binary data in ASCII format. It\'s commonly used for encoding data in URLs, emails, and JSON.',
            },
            {
                question: 'When should I use Base64?',
                answer: 'Use Base64 when you need to transmit binary data over text-based protocols, embed images in HTML/CSS, or encode data in JSON or XML.',
            },
            {
                question: 'Is Base64 encryption?',
                answer: 'No, Base64 is encoding, not encryption. It makes data readable but does not secure it. Anyone can decode Base64 data.',
            },
        ],
        relatedTools: ['url-tool', 'json-formatter'],
    },
    {
        id: 'url-tool',
        name: 'URL Encoder/Decoder',
        slug: 'url-tool',
        description: 'Encode and decode URLs with proper percent encoding. Convert special characters in URLs to their encoded format or decode encoded URLs back to readable text. Essential for web developers and SEO professionals.',
        shortDescription: 'Encode and decode URLs and special characters',
        category: 'converter',
        icon: 'Link',
        keywords: ['url encoder', 'url decoder', 'percent encoding', 'url encode', 'uri encoding'],
        faqs: [
            {
                question: 'What is URL encoding?',
                answer: 'URL encoding (percent encoding) converts special characters into a format that can be transmitted over the internet. Spaces become %20, & becomes %26, etc.',
            },
            {
                question: 'Why do URLs need encoding?',
                answer: 'URLs can only contain certain characters. Special characters, spaces, and non-ASCII characters must be encoded to ensure the URL works correctly.',
            },
            {
                question: 'Is this the same as HTML encoding?',
                answer: 'No, URL encoding uses percent signs (%) while HTML encoding uses entities like &amp;. They serve different purposes.',
            },
        ],
        relatedTools: ['base64-tool', 'json-formatter'],
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        slug: 'unit-converter',
        description: 'Convert between different units of measurement instantly. Supports length, weight, temperature, area, digital storage, and time conversions. Essential tool for students, professionals, and everyday calculations.',
        shortDescription: 'Convert length, weight, temperature, area, and more',
        category: 'converter',
        icon: 'ArrowRightLeft',
        keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'measurement converter', 'digital storage converter', 'time converter'],
        recommended: true,
        faqs: [
            {
                question: 'How accurate are the conversions?',
                answer: 'Our conversions use standard international conversion factors for maximum accuracy. For very small or large numbers, we maintain high precision.',
            },
            {
                question: 'Which units are supported?',
                answer: 'We support all common metric and imperial units for length (m, km, ft, miles), weight (kg, lbs, oz), temperature (C, F, K), area, digital storage, and time.',
            },
            {
                question: 'Can I copy the result?',
                answer: 'Yes, simply click the copy icon next to the result field to copy the converted value to your clipboard.',
            },
        ],
        relatedTools: ['percentage-calculator', 'loan-calculator'],
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
    { keywords: ['password', 'generate', 'secure', 'random', 'strong'], toolSlug: 'password-generator' },
    { keywords: ['json', 'format', 'validate', 'beautify', 'minify'], toolSlug: 'json-formatter' },
    { keywords: ['qr code', 'qr', 'barcode', 'scan'], toolSlug: 'qr-generator' },
    { keywords: ['percentage', 'percent', '%', 'calculate'], toolSlug: 'percentage-calculator' },
    { keywords: ['base64', 'encode', 'decode'], toolSlug: 'base64-tool' },
    { keywords: ['url', 'encode url', 'decode url', 'percent'], toolSlug: 'url-tool' },
    { keywords: ['unit', 'convert', 'length', 'weight', 'temp'], toolSlug: 'unit-converter' },
]
