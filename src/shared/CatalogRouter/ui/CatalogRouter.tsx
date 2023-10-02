import {FC} from "react";
import {Route} from "./../types";
import Link from "next/link";

interface CatalogRouterProps {
    routes?: Route[]
}

const CatalogRouter: FC<CatalogRouterProps> = ({ routes = [] }) => {
    let fullPath: string = '';

    const fullRoutes: Route[] = [
        {
            name: 'Главная',
            path: '/'
        },
        {
            name: 'Каталог',
            path: 'catalog'
        },
        ...routes
    ]

    return (
        <div className="mt-2 mb-7 md:mt-7 md:mb-9 lg:mb-12 font-roboto">
            <ul className="flex gap-x-3.5 mb-7 flex-wrap gap-y-2">
                {
                    fullRoutes.map((route, index) => {
                        if (route.isAbsolute === true) {
                            fullPath = route.path;
                        } else fullPath += route.path;

                        return <li key={route.name + index} className='hidden border-r border-dark pr-2.5 last:border-none [&:nth-last-child(-n+2)]:block md:block hover:text-accent'>
                            <Link replace={true} href={fullPath}>{route.name}</Link>
                        </li>
                    })
                }
            </ul>

        </div>
    );
};

export default CatalogRouter;