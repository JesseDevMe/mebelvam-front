import {FC} from "react";
import {Category, CategoryCard, fetchCategories} from "@/entities/Category";
import collections_img from "@/../public/Pages/Home/Catalog/cat1.jpeg"
import sells from "@/../public/Pages/Home/Catalog/sells.jpg"

interface CatalogGridProps {
    children: React.ReactNode
}

const CatalogGrid: FC<CatalogGridProps> = ({ children }) => {

    return (
        <div className="grid grid-cols-[repeat(2,1fr)] min-[520px]:grid-cols-[repeat(3,1fr)]
                 lg:grid-cols-[repeat(4,1fr)]
                justify-center gap-2.5 md:gap-5 lg:gap-6 mt-5">

            {children}
        </div>
    );
};

export default CatalogGrid;