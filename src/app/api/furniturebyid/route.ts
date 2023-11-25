import { type NextRequest } from 'next/server'
import {fetchFurnitures} from "@/entities/Furniture";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const furnituresId = searchParams.get('id')?.split(',');

    if (!furnituresId) {
        return Response.json({error: {message: 'Furniture id exist in body'}}, {status: 400});
    }

    try {
        return Response.json(await fetchFurnitures(furnituresId));
    } catch (e) {
        return Response.json({error: {message: e}}, {status: 500});
    }
}