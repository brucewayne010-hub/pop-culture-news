'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Article } from '@/lib/types'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchArticles()
    }, [router])

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/articles')
            const data = await res.json()
            setArticles(data)
        } catch (error) {
            toast.error('Failed to fetch articles')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return

        const token = localStorage.getItem('adminToken')
        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.ok) {
                toast.success('Article deleted successfully')
                fetchArticles()
            } else {
                toast.error('Failed to delete article')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h1>
                <div className="flex gap-4">
                    <Link
                        href="/admin/dashboard/new"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        New Article
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Created
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                                        {article.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {article.category}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={`/admin/dashboard/edit/${article.id}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
