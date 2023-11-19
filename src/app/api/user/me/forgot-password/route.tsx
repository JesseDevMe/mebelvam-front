import {type NextRequest, NextResponse} from 'next/server'
import {fetchStrapi} from "@/shared/API";

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    const res = await fetchStrapi('/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
            }
        ),
    })

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}