'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
    initialQuery?: string
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none transition-colors text-lg"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all"
                aria-label="Search"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    )
}
