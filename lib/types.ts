export interface Article {
    id: string
    title: string
    slug: string
    description: string
    content: string
    category: string
    image_url: string | null
    source_name?: string | null
    source_url?: string | null
    is_auto_imported?: boolean
    created_at: string
    updated_at: string
}

export interface Admin {
    id: string
    email: string
    password_hash: string
    created_at: string
}

export type Category = 'Hollywood' | 'Bollywood' | 'Web Series' | 'Reviews' | 'Music'
