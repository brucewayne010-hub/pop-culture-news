'use client'

import { useState } from 'react'
import { Article } from '@/lib/types'

interface ArticleEditorProps {
    article?: Article
    onSubmit: (data: any) => void
}

export default function ArticleEditor({ article, onSubmit }: ArticleEditorProps) {
    const [formData, setFormData] = useState({
        title: article?.title || '',
        description: article?.description || '',
        content: article?.content || '',
        category: article?.category || 'Hollywood',
        image_url: article?.image_url || '',
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(formData)
        setLoading(false)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Enter article title"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                    <option value="Hollywood">Hollywood</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Web Series">Web Series</option>
                    <option value="Reviews">Reviews</option>
                </select>
            </div>

            <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                </label>
                <input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Brief description of the article"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content * (HTML supported)
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm transition-all"
                    placeholder="<p>Article content here...</p>"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
                </button>
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
