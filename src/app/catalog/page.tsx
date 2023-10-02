import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {Category, fetchCategories} from "@/entities/Category";
import { CatalogCard } from "@/entities/CatalogCard"
import collections_img from "../../../public/Pages/Home/Catalog/cat1.jpeg";
import sells from "../../../public/Pages/Home/Catalog/sells.jpg";
import {FurnitureCard} from "@/entities/FurnitureCard";

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

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <CatalogRouter/>
            <CatalogGrid>
                <>
                    <CatalogCard
                        name='Коллекции'
                        count={0}
                        imgUrl={collections_img.src}
                        slug={''}
                        id={0}
                    />

                    {
                        categories.map((category) =>
                            <CatalogCard
                                id={category.id}
                                name={category.name}
                                count={0}
                                imgUrl={category.imgUrl}
                                slug={category.slug}
                                key={category.name}
                            />
                        )
                    }

                    <CatalogCard
                        id={0}
                        name='Акции'
                        count={0}
                        imgUrl={sells.src}
                        slug={''}
                    />
                </>
            </CatalogGrid>
        </div>
    );
};

export default Page;