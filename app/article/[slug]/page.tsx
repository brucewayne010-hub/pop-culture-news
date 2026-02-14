import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

async function getArticle(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) {
        return null
    }

    return data
}

async function getRelatedArticles(category: string, currentId: string): Promise<Article[]> {
    const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .neq('id', currentId)
        .order('created_at', { ascending: false })
        .limit(3)

    return data || []
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug)

    if (!article) {
        return {
            title: 'Article Not Found',
        }
    }

    return {
        title: `${article.title} - Movie News Hub`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: article.image_url ? [article.image_url] : [],
        },
    }
}

export const revalidate = 60

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug)

    if (!article) {
        notFound()
    }

    const relatedArticles = await getRelatedArticles(article.category, article.id)

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {article.image_url && (
                    <div className="relative h-96 w-full">
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href={`/category/${article.category.toLowerCase().replace(' ', '-')}`}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-shadow"
                        >
                            {article.category}
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400">
                            {formatDate(article.created_at)}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {article.title}
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {article.description}
                    </p>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </article>

            {relatedArticles.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Related Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((related) => (
                            <Link
                                key={related.id}
                                href={`/article/${related.slug}`}
                                className="group"
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover">
                                    {related.image_url && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={related.image_url}
                                                alt={related.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {related.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
