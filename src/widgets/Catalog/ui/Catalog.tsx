import {FC} from "react";
import {categories} from "@/entities/Category/model";
import {Category} from "@/entities/Category";

interface CatalogProps {

}

const Catalog: FC<CatalogProps> = ({}) => {

    return (
        <div className="bg-light py-8 px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
            <h2 className="text-xl font-semibold text-center">Каталог</h2>

            <div className="grid grid-cols-[repeat(auto-fit,160px)] md:grid-cols-[repeat(auto-fit,220px)]
            lg:grid-cols-[repeat(auto-fit,300px)] justify-evenly gap-x-3 gap-y-4 mt-5">
                {
                    categories.map((category) =>
                        <Category
                            name={category.name}
                            count={category.count}
                            imgUrl={category.imgUrl}
                            key={category.name}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Catalog;