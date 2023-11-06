import {NextRequest} from "next/server";
import {fetchStrapi} from "@/shared/API";


export async function POST(request: NextRequest) {
    const {email, password} = await request.json();
    const res = await fetchStrapi('/auth/local/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            email,
            password,
        })
    })

    const data = await res.json();

    return Response.json(data);
}