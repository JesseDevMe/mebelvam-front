import { type NextRequest } from 'next/server'
import {fetchFiltersBySubId} from "@/entities/Filter";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');

    if (subcategoryId) {
        return Response.json(await fetchFiltersBySubId(Number(subcategoryId)));
    }

    return;
}