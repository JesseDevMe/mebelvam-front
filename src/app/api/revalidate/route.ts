import {NextRequest, NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export async function POST(request: NextRequest) {
    const authToken = request.headers.get('Authorization');
    if (!authToken) {
        return NextResponse.json({error: {message: 'Empty Bearer token', status: 401}}, {status: 401})
    }

    if (authToken !== ('Bearer ' + process.env.WEBHOOK_TOKEN)) {
        return NextResponse.json({error: {message: 'Invalid Bearer token', status: 401}}, {status: 401})
    }

    revalidateTag('all');

    return NextResponse.json({}, {status: 200})
}