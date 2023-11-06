'use client'
import {FC} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";
import useSizesStore from "@/widgets/Filters/store/useSizesStore";
import done from '@/../public/Pages/Furniture/done.svg'
import Image from "next/image";
import usePriceStore from "@/widgets/Filters/store/usePriceStore";
import useDefaultFiltersStore from "@/widgets/Filters/store/useDefaultFiltersStore";

interface ApplyFiltersProps {

}

const ApplyFilters: FC<ApplyFiltersProps> = ({}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters = useCustomFiltersStore((state) => state.filters);
    const widthFilter = useSizesStore(state => state.width);
    const heightFilter = useSizesStore(state => state.height);
    const depthFilter = useSizesStore(state => state.depth);
    const priceFilter = usePriceStore(state => state.price);
    const manufacturerFilter = useDefaultFiltersStore(state => state.manufacturersId);
    const colorFilter = useDefaultFiltersStore(state => state.colorsId);

    const setIsOpen = useCustomFiltersStore(state => state.setIsOpen);

    function clickHandler() {
        const params = new URLSearchParams();
        params.set('page', '1');
        // @ts-ignore
        searchParams.get('sort') && params.set('sort', searchParams.get('sort'));
        filters.forEach((values, slug) => {
            params.set(slug, values.join(','));
        });
        widthFilter && params.set('width', widthFilter.min + '-' + widthFilter.max);
        heightFilter && params.set('height', heightFilter.min + '-' + heightFilter.max);
        depthFilter && params.set('depth', depthFilter.min + '-' + depthFilter.max);
        priceFilter && params.set('price', priceFilter.min + '-' + priceFilter.max);
        manufacturerFilter.length > 0 ? params.set('manufacturer', manufacturerFilter.join(',')) : params.delete('manufacturer');
        colorFilter.length > 0 ? params.set('color', colorFilter.join(',')) : params.delete('color');
        router.push(pathname + '?' + params.toString());
        setIsOpen(false);
    }

    return (
        <div
            className="py-2.5 px-10 bg-dark rounded text-light w-fit cursor-pointer"
            onClick={clickHandler}
        >
            <span>Применить</span>
            <Image className="inline-block ml-2.5" src={done} alt=''/>
        </div>
    );
};

export default ApplyFilters;