'use client'
import {FC, useEffect, useState} from "react";
import {SizeFilter} from "@/features/SizeFilter";
import useSizesStore from "@/widgets/Filters/store/useSizesStore";

interface SizeFiltersProps {
    isWidth: boolean;
    isHeight: boolean;
    isDepth: boolean;
    subcategoryId: number
}

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

const SizeFilters: FC<SizeFiltersProps> = ({isWidth, isHeight, isDepth, subcategoryId}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const setWidth = useSizesStore(state => state.setWidth);
    const setHeight = useSizesStore(state => state.setHeight);
    const setDepth = useSizesStore(state => state.setDepth);
    const width = useSizesStore(state => state.width);
    const height = useSizesStore(state => state.height);
    const depth = useSizesStore(state => state.depth);

    const [minWidth, setMinWidth] = useState(0);
    const [maxWidth, setMaxWidth] = useState(9999);

    const [minHeight, setMinHeight] = useState(0);
    const [maxHeight, setMaxHeight] = useState(9999);

    const [minDepth, setMinDepth] = useState(0);
    const [maxDepth, setMaxDepth] = useState(9999);

    useEffect(() => {
        fetch(`/api/sizes-limit?subcategoryId=${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
                setMinWidth(data.width.min);
                setMaxWidth(data.width.max);
                setMinHeight(data.height.min);
                setMaxHeight(data.height.max);
                setMinDepth(data.depth.min);
                setMaxDepth(data.depth.max);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));
    }, [])

    return (
        <>
            {fetchStatus === FetchStatus.DONE && isWidth && <SizeFilter
                title={'Ширина'}
                min={minWidth}
                max={maxWidth}
                setToStore={setWidth}
                storeValue={width}
            />}

            {fetchStatus === FetchStatus.DONE && isHeight && <SizeFilter
                title={'Высота'}
                min={minHeight}
                max={maxHeight}
                setToStore={setHeight}
                storeValue={height}
            />}

            {fetchStatus === FetchStatus.DONE && isDepth && <SizeFilter
                title={'Глубина'}
                min={minDepth}
                max={maxDepth}
                setToStore={setDepth}
                storeValue={depth}
            />}
        </>
    );
};

export default SizeFilters;