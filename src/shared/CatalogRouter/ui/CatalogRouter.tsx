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
        <div className="mt-2 mb-7 md:mb-9 lg:mb-0 md:mt-4 lg:mt-0 font-roboto col-span-2 lg:col-span-1 lg:self-center">
            <ul className="flex gap-x-3.5 flex-wrap gap-y-2">
                {
                    fullRoutes.map((route, index) => {
                        if (route.isAbsolute === true) {
                            fullPath = route.path;
                        } else fullPath += route.path;

                        return <li key={route.name + index} className='hidden border-r border-dark pr-2.5 last:border-none [&:nth-last-child(-n+2)]:block md:block hover:text-accent'>
                            <Link href={fullPath}>{route.name}</Link>
                        </li>
                    })
                }
            </ul>

        </div>
    );
};

export default CatalogRouter;