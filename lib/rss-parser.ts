// RSS Feed Parser Utility - Using rss-parser library
import Parser from 'rss-parser';

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
 * Parse RSS feed using rss-parser library
 */
export async function parseRSSFeed(feedUrl: string): Promise<ParsedArticle[]> {
    try {
        const parser = new Parser({
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const feed = await parser.parseURL(feedUrl);

        if (!feed.items) {
            return [];
        }

        const articles = feed.items.map(item => {
            const content = item.content || item.contentSnippet || item.summary || '';
            const description = item.contentSnippet || item.content || '';

            // Try to find an image
            let imageUrl = undefined;
            if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image')) {
                imageUrl = item.enclosure.url;
            } else if (content) {
                const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) imageUrl = imgMatch[1];
            }

            return {
                title: item.title || 'Untitled',
                description: stripHTML(description).substring(0, 300),
                content: content,
                link: item.link || '',
                pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
                imageUrl: imageUrl,
                author: item.creator || item.author
            };
        }).filter(article => article.title && article.link).slice(0, 10);

        console.log(`Successfully fetched ${articles.length} articles from ${feedUrl} using rss-parser`);
        return articles;

    } catch (error) {
        console.error(`Error parsing RSS feed ${feedUrl} with rss-parser:`, error);
        // Fallback to rss2json if rss-parser fails (e.g. strict CORS or headers)
        return parseRSSFeedFallback(feedUrl);
    }
}

async function parseRSSFeedFallback(feedUrl: string): Promise<ParsedArticle[]> {
    try {
        // Use rss2json.com - free API that converts RSS to JSON
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=public&count=5`;
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch RSS feed (fallback): ${feedUrl}`, response.status);
            return [];
        }

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
            console.error(`Invalid RSS feed response from (fallback) ${feedUrl}:`, data.message || 'Unknown error');
            return [];
        }

        const articles: ParsedArticle[] = data.items.map((item: any) => ({
            title: item.title || 'Untitled',
            description: stripHTML(item.description || item.content || '').substring(0, 300),
            content: item.content || item.description || '',
            link: item.link || item.guid || '',
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            imageUrl: item.thumbnail || item.enclosure?.link,
            author: item.author,
        })).filter((a: any) => a.title && a.link);

        console.log(`Successfully fetched ${articles.length} articles from ${feedUrl} using rss2json fallback`);
        return articles;
    } catch (error) {
        console.error(`Error parsing RSS feed (fallback) ${feedUrl}:`, error);
        return [];
    }
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
