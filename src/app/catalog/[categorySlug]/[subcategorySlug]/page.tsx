import {FC} from "react";
import {FurnituresPage} from "@/widgets/FurnituresPage";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {fetchSubcategory} from "@/entities/Subcategory";
import {fetchCategory} from "@/entities/Category/model";
import {Filters} from "@/widgets/Filters";

interface PageProps {
    params: {
        categorySlug: string,
        subcategorySlug: string,
    },

}

const Page: FC<PageProps> = async ({params}) => {
    // Проверка категории
    const categorySlugTokens = params.categorySlug.split('-');
    const categoryId = Number(categorySlugTokens.pop());

    if (Number.isNaN(categoryId)) return <div>Ничаго не найдено1</div>;
    const category = await fetchCategory(categoryId);

    if (category.slug !== categorySlugTokens.join('-')) return <div>Ничаго не найдено2</div>;

    // Проверка сабкатегории
    const slugTokens = params.subcategorySlug.split('-');
    const subcategoryId = Number(slugTokens.pop());

    if (Number.isNaN(subcategoryId)) return <div>Ничаго не найдено3</div>;
    const subcategory = await fetchSubcategory(subcategoryId);
    if (categoryId !== subcategory.categoryId) return <div>Ничаго не найдено4</div>;

    if (subcategory.slug != slugTokens.join('-')) return <div>Ничаго не найдено5</div>;


    const routes = [
        {
            name: category.name,
            path: `/${params.categorySlug}`
        },
        {
            name: subcategory.name,
            path: `/${params.subcategorySlug}`
        }
    ]

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <div className="grid grid-cols-2 lg:mt-10 lg:mb-[55px]">
                <CatalogRouter
                    routes={routes}
                />

                <Filters
                    subcategoryId={subcategoryId}
                />
            </div>

            <FurnituresPage
            subcategoryId={subcategoryId}
            />

        </div>
    );
};

export default Page;