import {FC} from "react";
import {Category, CategoryCard, fetchCategories} from "@/entities/Category";
import collections_img from "@/../public/Pages/Home/Catalog/cat1.jpeg"
import sells from "@/../public/Pages/Home/Catalog/sells.jpg"

interface CatalogGridProps {
    children: React.ReactNode
}

const CatalogGrid: FC<CatalogGridProps> = ({ children }) => {

    return (
        <div className="grid grid-cols-[repeat(auto-fit,160px)] md:grid-cols-[repeat(auto-fit,220px)]
            lg:grid-cols-[repeat(auto-fit,300px)] justify-center gap-2.5 md:gap-5 lg:gap-6 mt-5">

            {children}
        </div>
    );
};

export default CatalogGrid;