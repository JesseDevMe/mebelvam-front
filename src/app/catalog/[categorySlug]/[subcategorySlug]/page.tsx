import {FC} from "react";
import {FurnituresPage} from "@/widgets/FurnituresPage";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {fetchSubcategory} from "@/entities/Subcategory";
import {fetchCategory} from "@/entities/Category/model";
import {Filters} from "@/widgets/Filters";
import {notFound} from "next/navigation";

interface PageProps {
    params: {
        categorySlug: string,
        subcategorySlug: string,
    },

}

const Page: FC<PageProps> = async ({params}) => {
    try { // Проверка категории
        const categorySlugTokens = params.categorySlug.split('-');
        const categoryId = Number(categorySlugTokens.pop());

        if (Number.isNaN(categoryId)) return notFound();
        const category = await fetchCategory(categoryId);

        if (category.slug !== categorySlugTokens.join('-')) return notFound();

        // Проверка сабкатегории
        const slugTokens = params.subcategorySlug.split('-');
        const subcategoryId = Number(slugTokens.pop());

        if (Number.isNaN(subcategoryId)) return notFound();
        const subcategory = await fetchSubcategory(subcategoryId);
        if (categoryId !== subcategory.categoryId) return notFound();

        if (subcategory.slug != slugTokens.join('-')) return notFound();


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
            <div
                className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
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
    } catch (e) {
        notFound();
    }
};

export default Page;