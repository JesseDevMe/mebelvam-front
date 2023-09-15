import cat1 from '@/../public/Pages/Home/Catalog/cat1.jpeg'
import cat2 from '@/../public/Pages/Home/Catalog/cat2.jpeg'
import cat3 from '@/../public/Pages/Home/Catalog/cat3.jpeg'
import cat4 from '@/../public/Pages/Home/Catalog/cat4.jpeg'
import cat5 from '@/../public/Pages/Home/Catalog/cat5.jpeg'
import cat6 from '@/../public/Pages/Home/Catalog/cat6.jpeg'
import cat7 from '@/../public/Pages/Home/Catalog/cat7.jpeg'
import cat8 from '@/../public/Pages/Home/Catalog/cat8.jpeg'
import cat9 from '@/../public/Pages/Home/Catalog/cat9.svg'


interface Category {
    name: string;
    count: number;
    imgUrl: string;
}

export const categories: Category[] = [
    {
        name: 'Коллекции',
        count: 1325,
        imgUrl: cat1.src
    },
    {
        name: 'Прихожая',
        count: 181,
        imgUrl: cat2.src
    },
    {
        name: 'Гостиная',
        count: 171,
        imgUrl: cat3.src
    },
    {
        name: 'Кухня',
        count: 168,
        imgUrl: cat4.src
    },
    {
        name: 'Спальня',
        count: 357,
        imgUrl: cat5.src
    },
    {
        name: 'Детская',
        count: 247,
        imgUrl: cat6.src
    },
    {
        name: 'Шкафы',
        count: 1317,
        imgUrl: cat7.src
    },
    {
        name: 'Столы и стулья',
        count: 137,
        imgUrl: cat8.src
    },
    {
        name: 'Акции',
        count: 28,
        imgUrl: cat9.src
    },
]