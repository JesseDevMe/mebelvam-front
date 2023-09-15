import slide1 from '@/../public/Pages/Home/HotOffers/slide1.jpeg'
import slide2 from '@/../public/Pages/Home/HotOffers/slide2.jpeg'
import slide3 from '@/../public/Pages/Home/HotOffers/slide3.jpeg'
import slide4 from '@/../public/Pages/Home/HotOffers/slide4.jpeg'

interface Offer {
    title: string;
    price: number;
    oldPrice: number;
    imgUrl: string;
}

export const offers: Offer[] = [
    {
        title: 'Прихожая «Варда»',
        price: 9821,
        oldPrice: 11508,
        imgUrl: slide1.src,
    },
    {
        title: 'Шкаф распашной «ШК-2/2»',
        price: 5999,
        oldPrice: 7650,
        imgUrl: slide2.src,
    },
    {
        title: 'Центральная секция «Белла»',
        price: 13684,
        oldPrice: 15739,
        imgUrl: slide3.src,
    },
    {
        title: 'Гостиная «Багира»',
        price: 32500,
        oldPrice: 32500,
        imgUrl: slide4.src,
    },
]