import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {Category, fetchCategories} from "@/entities/Category";
import { CatalogCard } from "@/entities/CatalogCard"
import collections_img from "../../../public/Pages/Home/Catalog/cat1.jpeg";
import {fetchStrapi} from "@/shared/API";
import Link from "next/link";
import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Каталог - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Каталог магазина. У нас большой ассортимент за приятную цену.',
}

interface PageProps {

}

const Page: FC<PageProps> = async ({}) => {
    let categories: Category[] = [];
    try {
        categories = await fetchCategories();
    } catch (e) {
        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                <div className="lg:mt-10 lg:mb-[55px]">
                    <CatalogRouter/>
                </div>
                <p>
                    Не удалось загрузить каталог. Пожалуйста, попробуйте снова чуть позже. Мы уже решаем возникшую проблему.
                </p>
            </div>
        );
    }

    for (const category of categories) {
        const res = await fetchStrapi(`/furnitures?filters[subcategory][category][id]=${category.id}&pagination[pageSize]=1&fields[0]=name`);

        if (!res.ok) {
            category.count = undefined;
            continue;
        }

        const { meta } = await res.json();


        category.count = meta.pagination.total;
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

    let promosCount: number | undefined = undefined;
    {
        const res = await fetchStrapi(`/furnitures?pagination[pageSize]=1&fields[0]=name&filters[variants][attributes][old_price][$notNull]=true`);

        if (!res.ok) {
            promosCount = undefined;
        } else {
            const { meta } = await res.json();
            promosCount = meta.pagination.total;
        }

    }

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <div className="lg:mt-10 lg:mb-[55px]">
                <CatalogRouter/>
            </div>
            <CatalogGrid>
                <>
                    <Link href={`/catalog/collections`} className="rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                        <div className="relative w-full aspect-[4/3] bg-accent flex justify-center items-center text-light font-montserrat text-5xl font-bold">
                            <Image
                                src={collections_img} fill
                                sizes="50vw,(min-width: 520px) 33vw, (min-width: 1024px) 25vw"
                                style={{objectFit: 'cover'}} alt="Коллекции"
                            />
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
                    {promosCount !== undefined &&
                        <Link href={`/catalog/promos`} className="rounded overflow-hidden bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
                            <div className="w-full aspect-[4/3] bg-accent flex justify-center items-center text-light font-montserrat text-4xl lg:text-5xl font-bold">
                                АКЦИИ
                            </div>

                            <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                                Акции
                            </div>
                        </Link>
                    }
                </>
            </CatalogGrid>
        </div>
    );
};

export default Page;