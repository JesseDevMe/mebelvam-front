import { type NextRequest } from 'next/server'
import {fetchFurnitures} from "@/entities/Furniture";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const furnituresId = searchParams.get('id')?.split(',');



    if (furnituresId) {
        return Response.json(await fetchFurnitures(furnituresId));
    }

    return Response.error();
}