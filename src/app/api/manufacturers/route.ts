import {fetchStrapi} from "@/shared/API";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');

    if (!subcategoryId) {
        return Response.json(
            []
        );
    }

    const res = await fetchStrapi(`/manufacturers?fields[0]=name&filters[furnitures][subcategory]=${subcategoryId}`)

    if (!res.ok) {
        throw new Error('manufacturers fetch error');
    }

    const { data } = await res.json();

    return Response.json(
        data.map((manufacturer: any) => ({
            id: manufacturer.id.toString(),
            name: manufacturer.attributes.name,
        }))
    );

}