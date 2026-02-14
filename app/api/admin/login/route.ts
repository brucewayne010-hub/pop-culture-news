import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        const { data: admin, error } = await supabaseAdmin
            .from('admins')
            .select('*')
            .eq('email', email)
            .single()

        if (error || !admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const isValidPassword = await comparePassword(password, admin.password_hash)

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const token = generateToken({ email: admin.email, id: admin.id })

        return NextResponse.json({ token, email: admin.email })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
