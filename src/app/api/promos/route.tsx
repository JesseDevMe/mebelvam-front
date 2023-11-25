import {NextRequest} from "next/server";
import {fetchPromos} from "@/entities/Promo";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let page: string | null | undefined = searchParams.get('page');

    if (!page) {
        page = undefined;
    }

    try {
        const promos = await fetchPromos({page});
        return Response.json(
            promos
        );
    } catch (e) {
        return Response.json({error: {message: e}}, {status: 500})
    }

}