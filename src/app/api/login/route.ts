import {NextRequest} from "next/server";
import {fetchStrapi} from "@/shared/API";


export async function POST(request: NextRequest) {
    const {identifier, password} = await request.json();
    const res = await fetchStrapi('/auth/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier,
            password,
        }),
    })

    const data = await res.json();

    return Response.json(data);
}