import {FC, useEffect, useState} from "react";
import useDefaultFiltersStore from "@/widgets/Filters/store/useDefaultFiltersStore";
import {DefaultFilter} from "@/features/DefaultFilter";
import {Color} from "@/entities/Color";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface ColorFilterProps {
    subcategoryId: number;
}

const ColorFilter: FC<ColorFilterProps> = ({ subcategoryId }) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const storeValues = useDefaultFiltersStore(state => state.colorsId);
    const addToStore = useDefaultFiltersStore(state => state.addColor);
    const removeFromStore = useDefaultFiltersStore(state => state.removeColor)
    const [colors, setColors] = useState<Color[]>([]);


    useEffect(() => {
        fetch(`/api/colors?subcategoryId=${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
                setColors(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));
    }, [])

    return (
        <div>
            {fetchStatus === FetchStatus.DONE &&
                <DefaultFilter
                    title={'Цвет'}
                    colors={true}
                    values={colors.map((color) => ({
                        name: color.name,
                        value: color.id.toString(),
                        colorHash: color.colorHash,
                    }))}
                    storeValues={storeValues}
                    addToStore={addToStore}
                    removeFromStore={removeFromStore}
                />
            }
        </div>
    );
};

export default ColorFilter;