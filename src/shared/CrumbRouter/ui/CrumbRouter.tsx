import {FC} from "react";
import {Route} from "@/shared/CatalogRouter";
import Link from "next/link";

interface CrumbRouterProps {
    routes?: Route[],
}

const CrumbRouter: FC<CrumbRouterProps> = ({ routes = [] }) => {
    let fullPath: string = '';

    const fullRoutes: Route[] = [
        {
            name: 'Главная',
            path: '/'
        },
        ...routes
    ]

    return (
        <div className="my-[30px] md:my-9 lg:my-[50px] font-roboto col-span-2 lg:col-span-1 lg:self-center">
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

export default CrumbRouter;