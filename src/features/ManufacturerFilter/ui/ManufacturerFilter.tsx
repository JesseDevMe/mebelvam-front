'use client'
import {FC, useEffect, useState} from "react";
import {DefaultFilter} from "@/features/DefaultFilter";
import useDefaultFiltersStore from "@/widgets/Filters/store/useDefaultFiltersStore";

export type Manufacturer = {
    id: string,
    name: string,
}

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface ManufacturerFilterProps {
    subcategoryId: number;
}

const ManufacturerFilter: FC<ManufacturerFilterProps> = ({ subcategoryId }) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const storeValues = useDefaultFiltersStore(state => state.manufacturersId);
    const addToStore = useDefaultFiltersStore(state => state.addManufacturer);
    const removeFromStore = useDefaultFiltersStore(state => state.removeManufacturer)
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);


    useEffect(() => {
        fetch(`/api/manufacturers?subcategoryId=${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
                setManufacturers(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));
    }, [])

    return (
        <div>
            {fetchStatus === FetchStatus.DONE &&
                <DefaultFilter
                    title={'Производитель'}
                    values={manufacturers.map((manufacturer) => ({
                        name: manufacturer.name,
                        value: manufacturer.id,
                    }))}
                    storeValues={storeValues}
                    addToStore={addToStore}
                    removeFromStore={removeFromStore}
                />
            }
        </div>
    );
};

export default ManufacturerFilter;