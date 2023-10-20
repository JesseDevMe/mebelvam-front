export type CustomFilterValue = {
    id: number;
    name: string;
}

export type CustomFilterType = {
    slug: string;
    title: string;
    values: CustomFilterValue[];
}

export type DefaultFiltersType = {
    price: boolean;
    width: boolean;
    height: boolean;
    depth: boolean;
    manufacturer: boolean;
}

export type FiltersType = {
    customFilters: CustomFilterType[];
    defaultFilters: DefaultFiltersType;
}