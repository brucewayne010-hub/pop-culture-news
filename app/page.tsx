import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'
import Hero from '@/components/Hero'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'
import RefreshIndicator from '@/components/RefreshIndicator'

async function getLatestArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)

    if (error) {
        console.error('Error fetching articles:', error)
        return []
    }

    return data || []
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
    const articles = await getLatestArticles()

    return (
        <div className="space-y-12">
            <Hero />

            <section className="animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Latest News
                    </h2>
                    <CategoryFilter />
                </div>

                <div className="mb-6">
                    <RefreshIndicator />
                </div>

                {articles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No articles found. Check back soon!
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
            </section>
        </div>
    )
}
