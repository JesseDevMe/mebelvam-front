import {type NextRequest, NextResponse} from 'next/server'
import {fetchStrapi} from "@/shared/API";

export async function POST(request: NextRequest) {
    const { code, password, passwordConfirmation } = await request.json();

    const res = await fetchStrapi('/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                code: code,
                password: password,
                passwordConfirmation: passwordConfirmation,
            }
        ),
        next: {revalidate: 0}
    })

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}