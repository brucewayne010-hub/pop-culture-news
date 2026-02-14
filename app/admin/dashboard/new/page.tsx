'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ArticleEditor from '@/components/ArticleEditor'

export default function NewArticle() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
        }
    }, [router])

    const handleSubmit = async (formData: any) => {
        const token = localStorage.getItem('adminToken')

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Article created successfully!')
                router.push('/admin/dashboard')
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to create article')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Create New Article
            </h1>
            <ArticleEditor onSubmit={handleSubmit} />
        </div>
    )
}
