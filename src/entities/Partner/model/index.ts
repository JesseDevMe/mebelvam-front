import {fetchStrapi} from "@/shared/API";
import {Partner} from "@/entities/Partner";

export async function fetchPartners() {
    const res = await fetchStrapi('/partners?populate=*');

    if (!res.ok) {
        throw new Error('partners fetch error');
    }

    const { data } = await res.json();

    const partners: Partner[] = data.map((partner: any): Partner => {
        return {
            imageUrl: process.env.STRAPI_URL + partner.attributes.image.data.attributes.url,
            name: partner.attributes.name,
            description: partner.attributes.description.replaceAll('\n', '\n\n'),
        }
    });

    return partners;
}