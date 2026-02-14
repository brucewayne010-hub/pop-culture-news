// Legal, free RSS news sources for pop culture content
// All sources are publicly available RSS feeds with proper attribution

export interface RSSSource {
    name: string
    url: string
    category: 'Hollywood' | 'Bollywood' | 'Web Series' | 'Music' | 'Reviews'
    description: string
}

export const RSS_SOURCES: RSSSource[] = [
    // Hollywood News
    {
        name: 'Variety',
        url: 'https://variety.com/feed/',
        category: 'Hollywood',
        description: 'Entertainment news and analysis'
    },
    {
        name: 'The Hollywood Reporter',
        url: 'https://www.hollywoodreporter.com/feed/',
        category: 'Hollywood',
        description: 'Breaking entertainment news'
    },
    {
        name: 'Deadline Hollywood',
        url: 'https://deadline.com/feed/',
        category: 'Hollywood',
        description: 'Hollywood news and insights'
    },
    {
        name: 'IndieWire',
        url: 'https://www.indiewire.com/feed/',
        category: 'Hollywood',
        description: 'Film and TV news'
    },

    // Bollywood News
    {
        name: 'Bollywood Hungama',
        url: 'https://www.bollywoodhungama.com/rss/news.xml',
        category: 'Bollywood',
        description: 'Latest Bollywood news and gossip'
    },
    {
        name: 'FilmiBeat',
        url: 'https://www.filmibeat.com/rss/bollywood-news.xml',
        category: 'Bollywood',
        description: 'Bollywood movies and celebrity news'
    },
    {
        name: 'Times of India - Entertainment',
        url: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
        category: 'Bollywood',
        description: 'Entertainment news from India'
    },

    // Music News
    {
        name: 'Billboard',
        url: 'https://www.billboard.com/feed/',
        category: 'Music',
        description: 'Music charts and industry news'
    },
    {
        name: 'NME',
        url: 'https://www.nme.com/feed',
        category: 'Music',
        description: 'Music news and reviews'
    },
    {
        name: 'Pitchfork',
        url: 'https://pitchfork.com/rss/news/',
        category: 'Music',
        description: 'Independent music news and reviews'
    },
    {
        name: 'Rolling Stone',
        url: 'https://www.rollingstone.com/feed/',
        category: 'Music',
        description: 'Music, film, and culture news'
    },

    // Web Series / Streaming
    {
        name: 'Variety - Streaming',
        url: 'https://variety.com/c/streaming/feed/',
        category: 'Web Series',
        description: 'Streaming platform news'
    },
    {
        name: 'What\'s on Netflix',
        url: 'https://www.whats-on-netflix.com/feed/',
        category: 'Web Series',
        description: 'Netflix news and releases'
    },

    // Reviews
    {
        name: 'Rotten Tomatoes',
        url: 'https://editorial.rottentomatoes.com/feed/',
        category: 'Reviews',
        description: 'Movie and TV reviews'
    },
    {
        name: 'IGN Movies',
        url: 'https://feeds.feedburner.com/ign/movies',
        category: 'Reviews',
        description: 'Movie reviews and trailers'
    },
]

// Get sources by category
export function getSourcesByCategory(category: string): RSSSource[] {
    return RSS_SOURCES.filter(source => source.category === category)
}

// Get all sources
export function getAllSources(): RSSSource[] {
    return RSS_SOURCES
}
