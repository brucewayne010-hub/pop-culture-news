'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ArticleEditor from '@/components/ArticleEditor'
import { Article } from '@/lib/types'

export default function EditArticle({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchArticle()
    }, [params.id, router])

    const fetchArticle = async () => {
        try {
            const res = await fetch(`/api/articles/${params.id}`)
            const data = await res.json()
            setArticle(data)
        } catch (error) {
            toast.error('Failed to fetch article')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (formData: any) => {
        const token = localStorage.getItem('adminToken')

        try {
            const res = await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Article updated successfully!')
                router.push('/admin/dashboard')
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to update article')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        )
    }

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600 dark:text-gray-400">Article not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Edit Article
            </h1>
            <ArticleEditor article={article} onSubmit={handleSubmit} />
        </div>
    )
}
