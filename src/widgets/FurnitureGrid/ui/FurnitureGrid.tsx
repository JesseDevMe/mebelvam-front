import {FC} from "react";

interface FurnitureGridProps {
    children: React.ReactNode
}

const FurnitureGrid: FC<FurnitureGridProps> = ({children}) => {

    return (
        <div className="grid grid-cols-[repeat(2,1fr)] min-[560px]:grid-cols-[repeat(3,1fr)] min-[950px]:grid-cols-[repeat(4,1fr)] min-[1400px]:grid-cols-[repeat(5,1fr)]
             justify-center gap-2.5 md:gap-3.5 xl:gap-5 mt-5">

            {children}
        </div>
    );
};

export default FurnitureGrid;