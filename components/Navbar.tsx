'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 glass backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold gradient-text">
                        Movie News Hub
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/category/hollywood"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Hollywood
                        </Link>
                        <Link
                            href="/category/bollywood"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Bollywood
                        </Link>
                        <Link
                            href="/category/web-series"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Web Series
                        </Link>
                        <Link
                            href="/category/reviews"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/search"
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            Search
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700 dark:text-gray-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 animate-slide-down">
                        <Link
                            href="/"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/category/hollywood"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Hollywood
                        </Link>
                        <Link
                            href="/category/bollywood"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Bollywood
                        </Link>
                        <Link
                            href="/category/web-series"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Web Series
                        </Link>
                        <Link
                            href="/category/reviews"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/search"
                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Search
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                        >
                            {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}
