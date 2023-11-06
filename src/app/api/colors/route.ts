import {fetchStrapi} from "@/shared/API";
import {NextRequest} from "next/server";
import {Color} from "@/entities/Color";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');

    if (!subcategoryId) {
        return Response.error();
    }

    const res = await fetchStrapi(`/colors?filters[furnitures][subcategory]=${subcategoryId}&sort=name:asc`)

    if (!res.ok) {
        throw new Error('colors fetch error');
    }

    const {data} = await res.json();

    const colors: Color[] = data.map((color: any): Color => {
        return {
            id: color.id,
            name: color.attributes.name,
            colorHash: color.attributes.color,
        }
    })

    return Response.json(
        colors
    );

}