import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Movie News Hub - Latest Entertainment News',
    description: 'Your source for the latest movie news, reviews, and entertainment updates from Hollywood, Bollywood, and web series.',
    keywords: ['movie news', 'entertainment', 'Hollywood', 'Bollywood', 'web series', 'reviews'],
    authors: [{ name: 'Movie News Hub' }],
    openGraph: {
        title: 'Movie News Hub',
        description: 'Latest entertainment news and movie updates',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                        <Navbar />
                        <main className="container mx-auto px-4 py-8">
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <Toaster position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    )
}
