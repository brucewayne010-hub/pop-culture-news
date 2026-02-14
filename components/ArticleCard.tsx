import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { formatDate, truncateText } from '@/lib/utils'

interface ArticleCardProps {
    article: Article
    index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
    return (
        <Link href={`/article/${article.slug}`}>
            <article
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                {article.image_url && (
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
                                {article.category}
                            </span>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {formatDate(article.created_at)}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {truncateText(article.description, 150)}
                    </p>

                    {article.source_name && article.source_url && (
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Via</span>
                            <a
                                href={article.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {article.source_name}
                            </a>
                        </div>
                    )}

                    <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                        Read More
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    )
}
