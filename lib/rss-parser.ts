// RSS Feed Parser Utility - Using RSS2JSON API
// This is more reliable for serverless environments

export interface ParsedArticle {
    title: string
    description: string
    content: string
    link: string
    pubDate: Date
    imageUrl?: string
    author?: string
}

/**
 * Parse RSS feed using RSS2JSON API (free, reliable, serverless-friendly)
 */
export async function parseRSSFeed(feedUrl: string): Promise<ParsedArticle[]> {
    try {
        // Use rss2json.com - free API that converts RSS to JSON
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=public&count=10`

        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
            },
        })

        if (!response.ok) {
            console.error(`Failed to fetch RSS feed: ${feedUrl}`, response.status)
            return []
        }

        const data = await response.json()

        if (data.status !== 'ok' || !data.items) {
            console.error(`Invalid RSS feed response from ${feedUrl}:`, data.message || 'Unknown error')
            return []
        }

        // Convert RSS2JSON format to our ParsedArticle format
        const articles: ParsedArticle[] = data.items.map((item: any) => ({
            title: item.title || 'Untitled',
            description: stripHTML(item.description || item.content || '').substring(0, 300),
            content: item.content || item.description || '',
            link: item.link || item.guid || '',
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            imageUrl: item.thumbnail || item.enclosure?.link || extractImageFromHTML(item.description || item.content || ''),
            author: item.author || undefined,
        })).filter((article: ParsedArticle) => article.title && article.link)

        console.log(`Successfully fetched ${articles.length} articles from ${feedUrl}`)
        return articles
    } catch (error) {
        console.error(`Error parsing RSS feed ${feedUrl}:`, error)
        return []
    }
}

/**
 * Extract image URL from HTML content
 */
function extractImageFromHTML(html: string): string | undefined {
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/)
    return imgMatch ? imgMatch[1] : undefined
}

/**
 * Strip HTML tags and decode entities
 */
function stripHTML(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100)
}
