import {FC} from "react";

interface ModulesGridProps {
    children: React.ReactNode
}

const ModulesGrid: FC<ModulesGridProps> = ({ children }) => {

    return (
        <div className="grid grid-cols-[repeat(2,1fr)] min-[640px]:grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(2,1fr)] min-[1200px]:grid-cols-[repeat(3,1fr)]
             justify-center gap-2.5 md:gap-3.5 xl:gap-5">

            {children}
        </div>
    );
};

export default ModulesGrid;