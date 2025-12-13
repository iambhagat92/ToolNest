import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue

    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error)
        return defaultValue
    }
}

export function setLocalStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return

    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
    }
}

export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
