import {FC} from "react";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {CatalogCard} from "@/entities/CatalogCard";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {fetchCategory} from "@/entities/Category/model";
import {fetchSubcategories, Subcategory} from "@/entities/Subcategory";
import {fetchStrapi} from "@/shared/API";
import {notFound} from "next/navigation";

interface PageProps {
    params: {
        categorySlug: string,
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    try {
        let slugTokens = params.categorySlug.split('-');
        const categoryId = Number(slugTokens.pop());

        if (Number.isNaN(categoryId)) return notFound();
        const category = await fetchCategory(categoryId);

        if (category.slug !== slugTokens.join('-')) return notFound();

        let subcategories: Subcategory[] = await fetchSubcategories(categoryId);

        for (const subcategory of subcategories) {
            const res = await fetchStrapi(`/furnitures?filters[subcategory][id]=${subcategory.id}&pagination[pageSize]=1&fields[0]=name`);

            if (!res.ok) {
                subcategory.count = undefined;
            } else {
                const {meta} = await res.json();
                subcategory.count = meta.pagination.total;
            }
        }

        const routes = [
            {
                name: category.name,
                path: `/${params.categorySlug}`
            }
        ]

        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                <div className="lg:mt-10 lg:mb-[55px]">
                    <CatalogRouter
                        routes={routes}
                    />
                </div>

                <CatalogGrid>
                    {
                        subcategories.map((subcategory) =>
                                <CatalogCard
                                    key={subcategory.id}
                                    id={subcategory.id}
                                    name={subcategory.name}
                                    count={subcategory.count}
                                    imgUrl={subcategory.imgUrl}
                                    slug={params.categorySlug + '/' + subcategory.slug}
                                />
                            )
                    }
                </CatalogGrid>

            </div>
        );
    } catch (e) {
        notFound();
    }
};

export default Page;