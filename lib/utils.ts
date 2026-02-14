import slugify from 'slugify'

export function createSlug(title: string): string {
    return slugify(title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    })
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
}

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}
