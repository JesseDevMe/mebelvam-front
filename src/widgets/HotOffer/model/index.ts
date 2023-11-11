import slide1 from '@/../public/Pages/Home/HotOffers/slide1.jpeg'
import slide2 from '@/../public/Pages/Home/HotOffers/slide2.jpeg'
import slide3 from '@/../public/Pages/Home/HotOffers/slide3.jpeg'
import slide4 from '@/../public/Pages/Home/HotOffers/slide4.jpeg'
import {fetchStrapi} from "@/shared/API";

export interface Offer {
    furnitureId: number;
    title: string;
    price: number;
    oldPrice: number;
    imgUrl: string;
    order: number,
}

export async function fetchHotOffers() {
    const res = await fetchStrapi('/hot-offers?populate[furniture][fields][0]=id&populate[image][fields][0]=url');

    if (!res.ok) {
        return [];
    }

    const { data } = await res.json();

    const offers: Offer[] = data.map((offer: any): Offer => ({
        furnitureId: offer.attributes.furniture.data.id,
        title: offer.attributes.title,
        oldPrice: offer.attributes.old_price,
        price: offer.attributes.price,
        imgUrl: process.env.STRAPI_URL + offer.attributes.image.data.attributes.url,
        order: offer.attributes.order,
    }))

    offers.sort((prevOffer, curOffer) => prevOffer.order - curOffer.order);

    return offers;
}