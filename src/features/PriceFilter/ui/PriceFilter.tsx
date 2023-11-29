'use client'
import {FC, useEffect, useState} from "react";
import {SizeFilter} from "@/features/SizeFilter";
import usePriceStore from "@/widgets/Filters/store/usePriceStore";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PriceFilterProps {
    subcategoryId: number;
}

const PriceFilter: FC<PriceFilterProps> = ({subcategoryId}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const price = usePriceStore(state => state.price);
    const setPrice = usePriceStore(state => state.setPrice);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(999999);

    useEffect(() => {
        fetch(`/api/price-limit?subcategoryId=${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
                if (data.min < Number.MAX_SAFE_INTEGER) setMin(data.min);
                if (data.max > 0) setMax(data.max);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));
    }, [subcategoryId])

    return (
        <div>
            {fetchStatus === FetchStatus.DONE && <SizeFilter title={'Цена'} min={min} max={max} setToStore={setPrice} storeValue={price}/>}
        </div>
    );
};

export default PriceFilter;