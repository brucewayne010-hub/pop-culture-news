'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RefreshIndicator() {
    const router = useRouter()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleRefresh = async () => {
        setIsRefreshing(true)
        router.refresh()
        setTimeout(() => setIsRefreshing(false), 1000)
    }

    return (
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Auto-updating every 30 minutes</span>
            </div>
            <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <svg
                    className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
            </button>
        </div>
    )
}
