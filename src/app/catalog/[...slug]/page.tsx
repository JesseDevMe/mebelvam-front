import {FC} from "react";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {fetchSubcategories, fetchSubcategory, Subcategory} from "@/entities/Subcategory";
import { CatalogCard } from "@/entities/CatalogCard"
import {fetchCategory} from "@/entities/Category/model";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {NextURL} from "next/dist/server/web/next-url";
import {revalidatePath} from "next/cache";
import {FurnitureMini} from "@/entities/Furniture";
import {fetchFurnituresBySub} from "@/entities/Furniture/model";
import {FurnitureCard} from "@/entities/FurnitureCard";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";

interface PageProps {
    params: {
        slug: string[]
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    let slugTokens = params.slug[0].split('-');
    const categoryId = Number(slugTokens.pop());
    const category = await fetchCategory(categoryId);
    let subcategories: Subcategory[] | null = null;
    let furnitures: FurnitureMini[] | null = null;

    if (category.slug != slugTokens.join('-')) return <div>Ничаго не найдено</div>;

    const routes = [
        {
            name: category.name,
            path: `/catalog/${params.slug[0]}`
        }
    ]

    if (params.slug[1]) {
        slugTokens = params.slug[1].split('-');
        const subcategoryId = Number(slugTokens.pop());
        const subcategory = await fetchSubcategory(subcategoryId);
        if (subcategory.slug != slugTokens.join('-')) return <div>Ничаго не найдено</div>;

        routes.push({
            name: subcategory.name,
            path: `/catalog/${params.slug.join('/')}`
        })

        furnitures = await fetchFurnituresBySub(subcategoryId);

    } else {
        subcategories = await fetchSubcategories(categoryId);
    }


    return (
        <div className="bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <CatalogRouter
                routes={routes}
            />
            <FurnitureGrid>
                {
                    subcategories
                        ? subcategories.map((subcategory) =>
                            <CatalogCard
                                id={subcategory.id}
                                name={subcategory.name}
                                count={0}
                                imgUrl={subcategory.imgUrl}
                                slug={params.slug[0] + '/' + subcategory.slug}
                            />
                        )
                        : furnitures &&
                            furnitures.map((furniture) =>
                                <FurnitureCard
                                    key={furniture.id}
                                    id={furniture.id}
                                    name={furniture.name}
                                    manufacturer={furniture.manufacturer}
                                    materials={furniture.materials?.join('/')}
                                    size={furniture.size}
                                    price={furniture.price}
                                    imagesUrl={furniture.imagesUrl}
                                />
                            )
                }
            </FurnitureGrid>
        </div>
    );
};

export default Page;


// import {FC} from "react";
// import {fetchSubcategory} from "@/entities/Subcategory";
//
// interface PageProps {
//     params: {
//         slugSubcategory: string
//     }
// }
//
// const Page: FC<PageProps> = async ({ params }) => {
//     const slugTokens = params.slugSubcategory.split('-');
//     const subcategoryId = Number(slugTokens.pop());
//     const subcategory = await fetchSubcategory(subcategoryId);
//     console.log(subcategory)
//
//     if (subcategory.slug != slugTokens.join('-')) return;
//
//     return (
//         <div>
//             {subcategory.name}
//         </div>
//     );
// };
//
// export default Page;