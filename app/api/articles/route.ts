import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { verifyToken } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, content, category, image_url } = body

        if (!title || !description || !content || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const slug = createSlug(title)

        const { data, error } = await supabaseAdmin
            .from('articles')
            .insert([
                {
                    title,
                    slug,
                    description,
                    content,
                    category,
                    image_url,
                },
            ])
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
