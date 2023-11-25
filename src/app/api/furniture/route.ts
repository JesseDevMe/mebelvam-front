import { type NextRequest } from 'next/server'
import {fetchFurnituresBySub} from "@/entities/Furniture";
import {min_max} from "@/widgets/Filters/store/useSizesStore";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    searchParams.delete('page');
    const subcategoryId = searchParams.get('subcategoryId');
    searchParams.delete('subcategoryId');
    const widthTokens = searchParams.get('width')?.split('-');
    searchParams.delete('width');
    const heightTokens = searchParams.get('height')?.split('-');
    searchParams.delete('height');
    const depthTokens = searchParams.get('depth')?.split('-');
    searchParams.delete('depth');
    const priceTokens = searchParams.get('price')?.split('-');
    searchParams.delete('price');
    const manufacturerTokens = searchParams.get('manufacturer')?.split(',');
    searchParams.delete('manufacturer');
    const colorTokens = searchParams.get('color')?.split(',');
    searchParams.delete('color');
    let sort = searchParams.get('sort');
    searchParams.delete('sort');
    // query is "hello" for /api/search?query=hello

    const customArray: string[][] = [];

    searchParams.forEach((values) => {
        customArray.push(values.split(','));
    })


    const width: min_max | undefined = widthTokens && {
        min: parseInt(widthTokens[0]),
        max: parseInt(widthTokens[1])
    }

    const height: min_max | undefined = heightTokens && {
        min: parseInt(heightTokens[0]),
        max: parseInt(heightTokens[1])
    }

    const depth: min_max | undefined = depthTokens && {
        min: parseInt(depthTokens[0]),
        max: parseInt(depthTokens[1])
    }

    const price: min_max | undefined = priceTokens && {
        min: parseInt(priceTokens[0]),
        max: parseInt(priceTokens[1])
    }

    if (sort !== 'asc' && sort !== 'desc') {
        sort = null;
    }

    if (!subcategoryId) {
        return Response.json({error: {message: 'Subcategory id in body exists'}}, {status: 400});
    }

    try {
        return Response.json(await fetchFurnituresBySub(Number(subcategoryId),
            {
                page: page || '1',
                sort: sort,
                customFilters: customArray,
                width,
                height,
                depth,
                price,
                manufacturer: manufacturerTokens,
                color: colorTokens
            }
        ));
    } catch (e) {
        return Response.json({error: {message: e}}, {status: 500});
    }
}