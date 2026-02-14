import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { verifyToken } from '@/lib/auth'
import { createSlug } from '@/lib/utils'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', params.id)
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, content, category, image_url } = body

        const slug = createSlug(title)

        const { data, error } = await supabaseAdmin
            .from('articles')
            .update({
                title,
                slug,
                description,
                content,
                category,
                image_url,
            })
            .eq('id', params.id)
            .select()
            .single()

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

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { error } = await supabaseAdmin
            .from('articles')
            .delete()
            .eq('id', params.id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
