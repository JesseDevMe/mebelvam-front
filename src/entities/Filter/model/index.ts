import {fetchStrapi} from "@/shared/API";
import {CustomFilterType, CustomFilterValue} from "@/entities/Filter";
import {DefaultFiltersType, FiltersType} from "@/entities/Filter/types";


export async function fetchFiltersBySubId(subcategoryId: number): Promise<FiltersType> {

    const customRes = await fetchStrapi('/specifics?populate=*&filters[subcategories]=' + subcategoryId);
    const defaultRes = await fetchStrapi(`/subcategories/${subcategoryId}?fields[0]=default_filters`);

    if (!customRes.ok || !defaultRes.ok) {
        throw new Error('filter by sub fetch error');
    }

    const { data } = await customRes.json();

    const customFilters: CustomFilterType[] = data.map( (filterData :any): CustomFilterType => {
        return {
            slug: filterData.attributes.slug,
            title: filterData.attributes.name,
            values: filterData.attributes.specific_values.data.map((value :any): CustomFilterValue => {
                return {
                    id: value.id,
                    name: value.attributes.value,
                }
            })
        }
    });

    const defaultData = await defaultRes.json();

    const defaultFilters: DefaultFiltersType = {
        price: defaultData.data.attributes.default_filters?.includes('price') || false,
        width: defaultData.data.attributes.default_filters?.includes('width') || false,
        height: defaultData.data.attributes.default_filters?.includes('height') || false,
        depth: defaultData.data.attributes.default_filters?.includes('depth') || false,
        manufacturer: defaultData.data.attributes.default_filters?.includes('manufacturer') || false,
    }

    return {
        defaultFilters,
        customFilters
    };
}