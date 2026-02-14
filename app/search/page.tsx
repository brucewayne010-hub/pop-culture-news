import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'

async function searchArticles(query: string): Promise<Article[]> {
    if (!query) return []

    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error searching articles:', error)
        return []
    }

    return data || []
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string }
}) {
    const query = searchParams.q || ''
    const articles = await searchArticles(query)

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                    Search Articles
                </h1>
                <div className="max-w-2xl mx-auto">
                    <SearchBar initialQuery={query} />
                </div>
            </div>

            {query && (
                <>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {articles.length > 0
                                ? `Found ${articles.length} result${articles.length !== 1 ? 's' : ''} for "${query}"`
                                : `No results found for "${query}"`}
                        </p>
                    </div>

                    {articles.length > 0 && (
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
                </>
            )}
        </div>
    )
}
