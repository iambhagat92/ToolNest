'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ProvidersProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
