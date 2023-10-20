import {fetchStrapi} from "@/shared/API";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');

    if (!subcategoryId) {
        return Response.json(
            {
                min: 0,
                max: 999999,
            }
        );
    }

    const ascRes = await fetchStrapi(`/furnitures?fields[0]=meta&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.price:asc&pagination[pageSize]=1`)
    const descRes = await fetchStrapi(`/furnitures?fields[0]=meta&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.price:desc&pagination[pageSize]=1`)

    if (!ascRes.ok || !descRes.ok) {
        throw new Error('price-limit fetch error');
    }

    const asc = await ascRes.json();
    const desc = await descRes.json();

    let min: number = Number.MAX_SAFE_INTEGER;
    let max: number = 0;

    asc.data[0].attributes.variants.forEach((variant: any) => {
        variant.attributes.forEach((attribute: any) => {
            if (attribute.price < min) {
                min = attribute.price;
            }
        })
    });

    desc.data[0].attributes.variants.forEach((variant: any) => {
        variant.attributes.forEach((attribute: any) => {
            if (attribute.price > max) {
                max = attribute.price;
            }
        })
    });


    return Response.json(
        {
            min,
            max
        }
    );

}