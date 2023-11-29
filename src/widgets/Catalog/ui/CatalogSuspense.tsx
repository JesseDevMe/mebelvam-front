import {FC} from "react";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import CatalogCardSkeleton from "@/entities/CatalogCard/ui/CatalogCardSkeleton";

interface CatalogSuspenseProps {

}

const CatalogSuspense: FC<CatalogSuspenseProps> = ({}) => {

    return (
        <div className="bg-light min-[1520px]:rounded-t-[50px]">
            <div className="max-w-[1520px] w-full mx-auto py-8 md:py-[50px] px-2.5 md:px-5 lg:px-10 xl:px-20 font-montserrat">
                <h2 className="text-xl font-semibold text-center">Каталог</h2>
                <CatalogGrid>
                    {
                        [...new Array(9)].map((_, index) =>
                            <CatalogCardSkeleton key={index}/>
                        )
                    }
                </CatalogGrid>
            </div>
        </div>
    );
};

export default CatalogSuspense;