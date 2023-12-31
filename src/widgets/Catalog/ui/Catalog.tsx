import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {CatalogCard} from "@/entities/CatalogCard";
import collections_img from "../../../../public/Pages/Home/Catalog/cat1.jpeg";
import {Category, fetchCategories} from "@/entities/Category";
import {fetchStrapi} from "@/shared/API";
import Image from "next/image";
import Link from "next/link";

interface CatalogProps {

}

const Catalog: FC<CatalogProps> = async ({}) => {
    let categories: Category[] = [];

    try {
        categories = await fetchCategories();
    } catch (error) {
        return (
            <div className="bg-light min-[1520px]:rounded-t-[50px]">
                <div className="max-w-[1520px] w-full mx-auto py-8 md:py-[50px] px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                    <h2 className="text-xl font-semibold text-center">Каталог</h2>
                    <p className="text-center py-5 md:py-8 lg:py-14 text-red-500">Не получилось загрузить каталог. Пожалуйста, перезагрузите страницу.</p>
                </div>
            </div>
        );
    }

    for (const category of categories) {
        const res = await fetchStrapi(`/furnitures?filters[subcategory][category][id]=${category.id}&pagination[pageSize]=1&fields[0]=name`);

        if (!res.ok) {
            category.count = undefined;
        } else {
            const { meta } = await res.json();

            category.count = meta.pagination.total;
        }
    }


    let collectionsCount: number | undefined = undefined;
    {
        const res = await fetchStrapi(`/collections?pagination[pageSize]=1&fields[0]=name`);

        if (!res.ok) {
            collectionsCount = undefined;
        } else {
            const { meta } = await res.json();

            collectionsCount = meta.pagination.total;
        }
    }

    return (
        <div className="bg-light min-[1520px]:rounded-t-[50px]">
            <div className="max-w-[1520px] w-full mx-auto py-8 md:py-[50px] px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                <h2 className="text-xl font-semibold text-center lg:mb-[50px] lg:text-2xl">Каталог</h2>
                <CatalogGrid>
                    <>
                        <Link href={`/catalog/collections`} className="rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                            <div className="relative w-full aspect-[4/3] flex justify-center items-center text-light font-montserrat text-5xl font-bold">
                                <Image
                                    src={collections_img} fill
                                    sizes="50vw,(min-width: 520px) 33vw, (min-width: 1024px) 25vw"
                                    style={{objectFit: 'cover'}} alt="Коллекции"/>
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

                        <Link href={`/catalog/promos`} className="rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                            <div className="w-full aspect-[4/3] bg-accent flex justify-center items-center text-light font-montserrat text-4xl font-bold lg:text-5xl">
                                АКЦИИ
                            </div>

                            <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                                Акции {0 !== undefined ? `(${0})` : ''}
                            </div>
                        </Link>
                    </>
                </CatalogGrid>
            </div>
        </div>
    );
};

export default Catalog;