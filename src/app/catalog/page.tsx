import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {Category, fetchCategories} from "@/entities/Category";
import { CatalogCard } from "@/entities/CatalogCard"
import collections_img from "../../../public/Pages/Home/Catalog/cat1.jpeg";
import sells from "../../../public/Pages/Home/Catalog/sells.jpg";
import {FurnitureCard} from "@/entities/FurnitureCard";
import {fetchStrapi} from "@/shared/API";
import Link from "next/link";
import Image from "next/image";

interface PageProps {

}

// const routes: Route[] = [
//     {
//         name: 'Главная',
//         path: '/',
//     },
//     {
//         name: 'Каталог',
//         path: '/catalog',
//     },
// ]

const Page: FC<PageProps> = async ({}) => {
    const categories: Category[] = await fetchCategories();

    // /furnitures?filters[subcategory][category][id]=1&pagination[pageSize]=1&fields[0]=meta

    for (const category of categories) {
        const res = await fetchStrapi(`/furnitures?filters[subcategory][category][id]=${category.id}&pagination[pageSize]=1&fields[0]=name`);

        if (!res.ok) {
            throw new Error('Category metadata fetch error')
        }

        const { meta } = await res.json();


        category.count = meta.pagination.total;
    }

    let collectionsCount: number | undefined = undefined;
    {
        const res = await fetchStrapi(`/collections?pagination[pageSize]=1&fields[0]=name`);

        if (!res.ok) {
            throw new Error('Collections metadata fetch error')
        }

        const { meta } = await res.json();

        collectionsCount = meta.pagination.total;
    }

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <div className="lg:mt-10 lg:mb-[55px]">
                <CatalogRouter/>
            </div>
            <CatalogGrid>
                <>
                    <Link href={`/catalog/collections`} className="min-w-[160px] md:min-w-[220px] min-[1440px]:min-w-[300px] rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                        <div className="relative w-full aspect-[4/3] bg-accent flex justify-center items-center text-light font-montserrat text-5xl font-bold">
                            <Image src={collections_img} fill style={{objectFit: 'cover'}} alt="Коллекции"/>
                        </div>

                        <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                            Коллекции {collectionsCount !== undefined ? `(${collectionsCount})` : ''}
                        </div>
                    </Link>


                    {
                        categories.map((category) =>
                            <CatalogCard
                                id={category.id}
                                name={category.name}
                                count={category.count}
                                imgUrl={category.imgUrl}
                                slug={category.slug}
                                key={category.name}
                            />
                        )
                    }

                    <Link href={`/catalog/promos`} className="min-w-[160px] md:min-w-[220px] min-[1440px]:min-w-[300px] rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                        <div className="w-full aspect-[4/3] bg-accent flex justify-center items-center text-light font-montserrat text-5xl font-bold">
                            АКЦИИ
                        </div>

                        <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                            Акции {0 !== undefined ? `(${0})` : ''}
                        </div>
                    </Link>
                </>
            </CatalogGrid>
        </div>
    );
};

export default Page;