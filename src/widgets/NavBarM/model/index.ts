import {Link} from './../types/index';
import home from '@/../public/NavMobile/home.svg'
import catalog from '@/../public/NavMobile/catalog.svg'
import human from '@/../public/NavMobile/human.svg'
import favorites from '@/../public/NavMobile/favorites.svg'

export const links: Link[] = [
    {
        name: 'Главная',
        link: '#',
        img: home
    },
    {
        name: 'Каталог',
        link: '#',
        img: catalog
    },
    {
        name: 'Вход',
        link: '#',
        img: human
    },
    {
        name: 'Избранное',
        link: '#',
        img: favorites
    },
];