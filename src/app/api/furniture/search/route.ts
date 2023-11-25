import {NextRequest} from "next/server";
import {fetchFurnituresByName} from "@/entities/Furniture";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const page = Number(searchParams.get('page'));
    const sort = searchParams.get('sort');

    if (!query || (sort !== 'asc' && sort !== 'desc' && sort !== null)) {
        return Response.json({error: {message: 'Invalid search params', status: 400}}, {status: 400})
    }

    try {
        const data = await fetchFurnituresByName(query, page || 1, sort);
        return Response.json(data);
    } catch (error) {
        return Response.json({error: {message: error, status: 500}}, {status: 500});
    }

}
