// Improved RSS Feed Parser for Netlify Serverless Functions
// Uses a more reliable approach with better error handling

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
 * Parse RSS feed using a CORS proxy for better compatibility
 */
export async function parseRSSFeed(feedUrl: string): Promise<ParsedArticle[]> {
    try {
        // Use allorigins.win as a CORS proxy - it's free and reliable
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`

        const response = await fetch(proxyUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)',
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (!response.ok) {
            console.error(`Failed to fetch RSS feed: ${feedUrl}`, response.status)
            return []
        }

        const xmlText = await response.text()

        // Basic validation
        if (!xmlText || xmlText.length < 100) {
            console.error(`Invalid RSS feed response from ${feedUrl}`)
            return []
        }

        const articles = parseXML(xmlText)
        return articles.slice(0, 10) // Limit to 10 articles per source
    } catch (error) {
        console.error(`Error parsing RSS feed ${feedUrl}:`, error)
        return []
    }
}

/**
 * Parse XML string and extract article data
 */
function parseXML(xmlText: string): ParsedArticle[] {
    const articles: ParsedArticle[] = []

    try {
        // Check if it's Atom or RSS
        const isAtom = xmlText.includes('<feed') || xmlText.includes('xmlns="http://www.w3.org/2005/Atom"')

        if (isAtom) {
            // Parse Atom feed
            const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/g
            let match

            while ((match = entryRegex.exec(xmlText)) !== null) {
                const entry = match[1]
                const article = parseAtomEntry(entry)
                if (article) articles.push(article)
            }
        } else {
            // Parse RSS feed
            const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g
            let match

            while ((match = itemRegex.exec(xmlText)) !== null) {
                const item = match[1]
                const article = parseRSSItem(item)
                if (article) articles.push(article)
            }
        }
    } catch (error) {
        console.error('Error parsing XML:', error)
    }

    return articles
}

/**
 * Parse RSS item
 */
function parseRSSItem(item: string): ParsedArticle | null {
    try {
        const title = extractTag(item, 'title')
        const description = extractTag(item, 'description') || extractTag(item, 'content:encoded') || ''
        const link = extractTag(item, 'link') || extractTag(item, 'guid')
        const pubDate = extractTag(item, 'pubDate') || extractTag(item, 'dc:date')
        const author = extractTag(item, 'dc:creator') || extractTag(item, 'author')

        // Extract image from media:content, media:thumbnail, or enclosure
        let imageUrl = extractAttribute(item, 'media:content', 'url') ||
            extractAttribute(item, 'media:thumbnail', 'url') ||
            extractAttribute(item, 'enclosure', 'url')

        // If no image found, try to extract from description HTML
        if (!imageUrl && description) {
            const imgMatch = description.match(/<img[^>]+src="([^">]+)"/)
            if (imgMatch) imageUrl = imgMatch[1]
        }

        if (!title || !link) return null

        // Clean HTML from description
        const cleanDescription = stripHTML(description).substring(0, 300)

        return {
            title: stripHTML(title),
            description: cleanDescription,
            content: description,
            link: link,
            pubDate: pubDate ? new Date(pubDate) : new Date(),
            imageUrl: imageUrl || undefined,
            author: author ? stripHTML(author) : undefined,
        }
    } catch (error) {
        console.error('Error parsing RSS item:', error)
        return null
    }
}

/**
 * Parse Atom entry
 */
function parseAtomEntry(entry: string): ParsedArticle | null {
    try {
        const title = extractTag(entry, 'title')
        const summary = extractTag(entry, 'summary') || extractTag(entry, 'content')
        const linkMatch = entry.match(/<link[^>]+href="([^"]+)"/)
        const link = linkMatch ? linkMatch[1] : ''
        const updated = extractTag(entry, 'updated') || extractTag(entry, 'published')
        const author = extractTag(entry, 'author>name')

        if (!title || !link) return null

        const cleanSummary = stripHTML(summary || '').substring(0, 300)

        return {
            title: stripHTML(title),
            description: cleanSummary,
            content: summary || '',
            link: link,
            pubDate: updated ? new Date(updated) : new Date(),
            author: author ? stripHTML(author) : undefined,
        }
    } catch (error) {
        console.error('Error parsing Atom entry:', error)
        return null
    }
}

/**
 * Extract content from XML tag
 */
function extractTag(xml: string, tagName: string): string {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName.split('>')[0]}>`, 'i')
    const match = xml.match(regex)
    return match ? match[1].trim() : ''
}

/**
 * Extract attribute from XML tag
 */
function extractAttribute(xml: string, tagName: string, attrName: string): string {
    const regex = new RegExp(`<${tagName}[^>]*${attrName}="([^"]+)"`, 'i')
    const match = xml.match(regex)
    return match ? match[1] : ''
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
