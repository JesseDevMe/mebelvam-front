import {FC} from "react";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {CatalogCard} from "@/entities/CatalogCard";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {fetchCategory} from "@/entities/Category/model";
import {fetchSubcategories, Subcategory} from "@/entities/Subcategory";

interface PageProps {
    params: {
        categorySlug: string,
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    let slugTokens = params.categorySlug.split('-');
    const categoryId = Number(slugTokens.pop());

    if (Number.isNaN(categoryId)) return <div>Ничаго не найдено1</div>;
    const category = await fetchCategory(categoryId);

    if (category.slug !== slugTokens.join('-')) return <div>Ничаго не найдено2</div>;

    let subcategories: Subcategory[] = await fetchSubcategories(categoryId);

    const routes = [
        {
            name: category.name,
            path: `/${params.categorySlug}`
        }
    ]

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <CatalogRouter
                routes={routes}
            />

            <CatalogGrid>
                {
                    subcategories
                        ? subcategories.map((subcategory) =>
                            <CatalogCard
                                id={subcategory.id}
                                name={subcategory.name}
                                count={0}
                                imgUrl={subcategory.imgUrl}
                                slug={params.categorySlug + '/' + subcategory.slug}
                            />
                        )

                        : <div>Тахой категории нема</div>
                }
            </CatalogGrid>

        </div>
    );
};

export default Page;