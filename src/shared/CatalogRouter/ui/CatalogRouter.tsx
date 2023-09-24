import {FC} from "react";
import {Route} from "./../types";
import Link from "next/link";

interface CatalogRouterProps {
    routes?: Route[]
}

const CatalogRouter: FC<CatalogRouterProps> = ({ routes }) => {

    return (
        <ul className="flex gap-x-3.5 font-roboto mb-7 ml-5">
            <li className="border-r-[1px] border-dark pr-2.5 last:border-none">
                <Link href="/">Главная</Link>
            </li>

            <li className="border-r-[1px] border-dark pr-2.5 last:border-none">
                <Link href="/catalog">Каталог</Link>
            </li>

            {
                routes?.map((route) =>
                    <li key={route.name} className="border-r-[1px] border-dark pr-2.5 last:border-none">
                        <Link href={route.path}>{route.name}</Link>
                    </li>
                )
            }
        </ul>
    );
};

export default CatalogRouter;