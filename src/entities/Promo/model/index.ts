import {Promo, Promos} from "@/entities/Promo";
import {fetchStrapi} from "@/shared/API";

type optionParams = {
    page?: string;
}

export async function fetchPromos(params?: optionParams): Promise<Promos> {
    const pageQuery = params?.page && `&pagination[page]=${params.page}`;
    const res = await fetchStrapi(`/furnitures?fields[0]=name&populate[images][fields][0]=url&populate[variants][populate]=attributes&filters[variants][attributes][old_price][$notNull]=true${pageQuery ? pageQuery : ''}`);

    if (!res.ok) {
        throw new Error('Promos fetch error');
    }

    const {data, meta} = await res.json();

    const promos: Promo[] = data.flatMap((promo: any): Promo[] => {
        return promo.attributes.variants.flatMap((variant: any): Promo[] => {
            const filteredAttr = variant.attributes.filter((attribute: any) => attribute.old_price ? true : false);

            return filteredAttr.map((attr: any): Promo => {
                return {
                    id: promo.id,
                    name: promo.attributes.name,
                    price: attr.price,
                    old_price: attr.old_price,
                    size: `${attr.width}x${attr.height}${attr.depth ? 'x' + attr.depth : ''}`,
                    color: variant.color,
                    imagesUrl: promo.attributes.images.data.map((image:any): string => process.env.STRAPI_URL + image.attributes.url),
                    variantId: variant.id,
                    attrId: attr.id,
                }
            })

        })

    });

    return {
        data: promos,
        meta: {
            pagination: {
                page: meta.pagination.page,
                pageCount: meta.pagination.pageCount,
            }
        }
    }
}