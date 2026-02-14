import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'

async function getArticlesByCategory(category: string): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching articles:', error)
        return []
    }

    return data || []
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const category = params.slug.replace(/-/g, ' ')
    return {
        title: `${category} News - Movie News Hub`,
        description: `Latest ${category} news and updates`,
    }
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const categoryMap: { [key: string]: string } = {
        'hollywood': 'Hollywood',
        'bollywood': 'Bollywood',
        'web-series': 'Web Series',
        'music': 'Music',
        'reviews': 'Reviews',
    }

    const category = categoryMap[params.slug]

    if (!category) {
        notFound()
    }

    const articles = await getArticlesByCategory(category)

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl glass">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {category}
                </h1>
                <p className="text-white/90 text-lg">
                    Latest updates and news from {category}
                </p>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No articles found in this category yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
