import {FC} from "react";
import Image from "next/image";

interface CatalogCardSkeletonProps {
}

const CatalogCardSkeleton: FC<CatalogCardSkeletonProps> = ({}) => {

    return (
        <div className="min-w-[160px] md:min-w-[220px] min-[1440px]:min-w-[300px] aspect-[4/3] rounded bg-fon animate-pulse shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors">

        </div>
    );
};

export default CatalogCardSkeleton;