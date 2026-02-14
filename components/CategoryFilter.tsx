'use client'

import { useRouter } from 'next/navigation'

export default function CategoryFilter() {
    const router = useRouter()

    const categories = [
        { name: 'All', slug: '/' },
        { name: 'Hollywood', slug: '/category/hollywood' },
        { name: 'Bollywood', slug: '/category/bollywood' },
        { name: 'Web Series', slug: '/category/web-series' },
        { name: 'Music', slug: '/category/music' },
        { name: 'Reviews', slug: '/category/reviews' },
    ]

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.slug}
                    onClick={() => router.push(category.slug)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all font-medium"
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}
