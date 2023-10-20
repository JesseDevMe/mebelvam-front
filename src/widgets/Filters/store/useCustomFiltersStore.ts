import { create } from 'zustand'
import {ReadonlyURLSearchParams} from "next/navigation";

interface FiltersState {
    filters: Map<string, number[]>;
    add: (filterSlug: string, valueId: number) => void;
    deleteValue: (filterSlug: string, valueId: number) => void;
    delete: (filterSlug: string) => void;
    clear: () => void;
    isOpen: boolean;
    setIsOpen: (bol: boolean) => void;
    init: (params: URLSearchParams) => void;
}

const useCustomFiltersStore = create<FiltersState>()((set) => ({
    filters: new Map<string, number[]>(),
    isOpen: false,
    add: (filterSlug, valueId) => set((state) => {
        if (!state.filters.has(filterSlug)) {
            state.filters.set(filterSlug, [valueId]);
        } else {
            state.filters.get(filterSlug)?.push(valueId);
        }

        return {filters: state.filters}
    }),
    deleteValue: (filterSlug, valueId) => set((state) => {
        if (!state.filters.has(filterSlug)) {
            return {};
        }

        const resultArray = state.filters.get(filterSlug)?.filter((el) => el !== valueId);

        if (!resultArray || resultArray.length <= 0) {
            state.filters.delete(filterSlug);
            return {
                filters: state.filters,
            }
        }
        return {
            // @ts-ignore
            filters: state.filters.set(filterSlug, resultArray),
        }
    }),
    delete: (filterSlug) => set((state) => {
        if (state.filters.has(filterSlug)) {
            state.filters.delete(filterSlug);
            return {
                filters: state.filters,
            }
        } else return {};
    }),
    clear: () => set((state) => {
        return {
            filters: new Map<string, number[]>(),
        }
    }),
    setIsOpen: (bol) => set((state) => ({isOpen: bol})),
    init: (params) => set((state) => {
        state.filters.clear();
        params.forEach((param, slug) => {
            state.filters.set(slug, param.split(',').map((token) => Number(token)));
        })

        return {
            filters: state.filters,
        };
    }),
}))

export default useCustomFiltersStore;