'use client'
import {FC} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";
import useSizesStore from "@/widgets/Filters/store/useSizesStore";
import usePriceStore from "@/widgets/Filters/store/usePriceStore";
import useDefaultFiltersStore from "@/widgets/Filters/store/useDefaultFiltersStore";

interface ClearFiltersProps {

}

const ClearFilters: FC<ClearFiltersProps> = ({}) => {
    const router = useRouter();
    const pathname = usePathname();

    const clearFilters = useCustomFiltersStore(state => state.clear);
    const clearSizes = useSizesStore(state => state.clear);
    const clearPrice = usePriceStore(state => state.clear);
    const clearManufacturer = useDefaultFiltersStore(state => state.clearManufacturer)
    const clearColor = useDefaultFiltersStore(state => state.clearColors)

    const setIsOpen = useCustomFiltersStore(state => state.setIsOpen);


    function clickHandler() {
        router.push(pathname + '?' + 'page=1');
        clearFilters();
        clearSizes();
        clearPrice();
        clearManufacturer();
        clearColor();
        setIsOpen(false);
    }

    return (
        <div
            className="py-2.5 px-10 bg-fon rounded text-dark w-fit border border-dark cursor-pointer hover:bg-white
                hover:text-accent hover:border-accent"
            onClick={clickHandler}
        >
            Сбросить
        </div>
    );
};

export default ClearFilters;