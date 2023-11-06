import {fetchStrapi} from "@/shared/API";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');

    if (!subcategoryId) {
        return Response.json(
            {
                min: 0,
                max: 9999,
            }
        );
    }

    const ascWidthRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.width:asc&pagination[pageSize]=1`);
    const descWidthRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.width:desc&pagination[pageSize]=1`);

    const ascHeightRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.height:asc&pagination[pageSize]=1`);
    const descHeightRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.height:desc&pagination[pageSize]=1`);

    const ascDepthRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.depth:asc&pagination[pageSize]=1`);
    const descDepthRes = await fetchStrapi(`/furnitures?fields[0]=name&populate[0]=variants.attributes&filters[subcategory][id]=${subcategoryId}&sort=variants.attributes.depth:desc&pagination[pageSize]=1`);

    if (!ascWidthRes.ok || !descWidthRes.ok || !ascHeightRes.ok || !descHeightRes.ok || !ascDepthRes.ok || !descDepthRes.ok) {
        throw new Error('sizes-limit fetch error');
    }

    const ascWidth = await ascWidthRes.json();
    const descWidth = await descWidthRes.json();

    const ascHeight = await ascHeightRes.json();
    const descHeight = await descHeightRes.json();

    const ascDepth = await ascDepthRes.json();
    const descDepth = await descDepthRes.json();

    let minWidth: number = 9999;
    let maxWidth: number = 0;

    ascWidth.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.width < minWidth) {
                minWidth = attribute.width;
            }
        })
    });

    descWidth.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.width > maxWidth) {
                maxWidth = attribute.width;
            }
        })
    });

    let minHeight: number = 9999;
    let maxHeight: number = 0;

    ascHeight.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.height < minHeight) {
                minHeight = attribute.height;
            }
        })
    });

    descHeight.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.height > maxHeight) {
                maxHeight = attribute.height;
            }
        })
    });

    let minDepth: number = 9999;
    let maxDepth: number = 0;

    ascDepth.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.depth < minDepth) {
                minDepth = attribute.depth;
            }
        })
    });

    descDepth.data[0]?.attributes.variants?.forEach((variant: any) => {
        variant.attributes?.forEach((attribute: any) => {
            if (attribute.depth > maxDepth) {
                maxDepth = attribute.depth;
            }
        });
    });


    return Response.json(
        {
            width: {
                min: minWidth,
                max: maxWidth
            },
            height: {
                min: minHeight,
                max: maxHeight
            },
            depth: {
                min: minDepth,
                max: maxDepth
            }
        }
    );

}