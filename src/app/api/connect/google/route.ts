import {NextRequest} from "next/server";
import {fetchStrapi} from "@/shared/API";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.toString().slice(searchParams.toString().indexOf('=') + 1);

    const res = await fetchStrapi('/auth/google/callback?access_token=' + token, {
        next: {revalidate: 0}
    });

    const data = await res.json();

    return Response.json(data);
}