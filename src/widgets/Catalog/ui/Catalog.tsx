import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {CatalogCard} from "@/entities/CatalogCard";
import collections_img from "../../../../public/Pages/Home/Catalog/cat1.jpeg";
import sells from "../../../../public/Pages/Home/Catalog/sells.jpg";
import {Category, fetchCategories} from "@/entities/Category";

interface CatalogProps {

}

const Catalog: FC<CatalogProps> = async ({}) => {
    const categories: Category[] = await fetchCategories();

    return (
        <div className="bg-light min-[1520px]:rounded-t-[50px]">
            <div className="max-w-[1520px] w-full mx-auto py-8 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                <h2 className="text-xl font-semibold text-center">Каталог</h2>
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
        </div>
    );
};

export default Catalog;