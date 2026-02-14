import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAllSources } from '@/lib/rss-sources'
import { parseRSSFeed, generateSlug } from '@/lib/rss-parser'

// This endpoint is called by Vercel Cron Jobs
// It fetches news from all RSS sources and stores them in the database

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow up to 60 seconds for RSS fetching

export async function GET(request: NextRequest) {
    try {
        // Verify the request is from Vercel Cron (optional security)
        const authHeader = request.headers.get('authorization')
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const sources = getAllSources()
        let totalFetched = 0
        let totalAdded = 0
        const errors: string[] = []

        console.log(`Starting RSS fetch from ${sources.length} sources...`)

        // Fetch from all sources
        for (const source of sources) {
            try {
                console.log(`Fetching from ${source.name}...`)
                const articles = await parseRSSFeed(source.url)
                totalFetched += articles.length

                // Process each article
                for (const article of articles) {
                    try {
                        // Generate slug from title and source
                        const baseSlug = generateSlug(article.title)
                        const slug = `${baseSlug}-${Date.now()}`

                        // Check if article already exists by source URL
                        const { data: existing } = await supabase
                            .from('articles')
                            .select('id')
                            .eq('source_url', article.link)
                            .single()

                        if (existing) {
                            console.log(`Article already exists: ${article.title}`)
                            continue
                        }

                        // Insert new article
                        const { error: insertError } = await supabase
                            .from('articles')
                            .insert({
                                title: article.title.substring(0, 200),
                                slug: slug,
                                description: article.description || article.title,
                                content: article.content || article.description || article.title,
                                category: source.category,
                                image_url: article.imageUrl || null,
                                source_name: source.name,
                                source_url: article.link,
                                is_auto_imported: true,
                            })

                        if (insertError) {
                            console.error(`Error inserting article: ${article.title}`, insertError)
                            errors.push(`${source.name}: ${insertError.message}`)
                        } else {
                            totalAdded++
                            console.log(`Added: ${article.title}`)
                        }
                    } catch (articleError) {
                        console.error(`Error processing article from ${source.name}:`, articleError)
                        errors.push(`${source.name}: ${articleError}`)
                    }
                }
            } catch (sourceError) {
                console.error(`Error fetching from ${source.name}:`, sourceError)
                errors.push(`${source.name}: ${sourceError}`)
            }
        }

        const response = {
            success: true,
            timestamp: new Date().toISOString(),
            sources: sources.length,
            totalFetched,
            totalAdded,
            errors: errors.length > 0 ? errors : undefined,
        }

        console.log('RSS fetch completed:', response)

        return NextResponse.json(response)
    } catch (error) {
        console.error('Fatal error in cron job:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
