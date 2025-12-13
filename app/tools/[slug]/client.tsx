'use client'

import { useEffect } from 'react'
import { setLocalStorage, getLocalStorage } from '@/lib/utils'

interface ToolPageClientProps {
    toolId: string
}

export default function ToolPageClient({ toolId }: ToolPageClientProps) {
    useEffect(() => {
        const recentTools = getLocalStorage<string[]>('recentTools', [])
        const updated = [toolId, ...recentTools.filter((id) => id !== toolId)].slice(0, 10)
        setLocalStorage('recentTools', updated)
        window.dispatchEvent(new Event('storage'))
    }, [toolId])

    return null
}
