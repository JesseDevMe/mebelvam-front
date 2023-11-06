import { create } from 'zustand'

interface DefaultFiltersState {
    manufacturersId: string[];
    addManufacturer: (id: string) => void;
    removeManufacturer: (id: string) => void;
    clearManufacturer: () => void;
    initManufacturers: (params: string | null) => void;

    colorsId: string[];
    addColor: (id: string) => void;
    removeColor: (id: string) => void;
    clearColors: () => void;
    initColors: (params: string | null) => void;
}

const useDefaultFiltersStore = create<DefaultFiltersState>()((set) => ({
    manufacturersId: [],
    colorsId: [],
    addManufacturer: (id) => set((state) => {
        if (!state.manufacturersId.includes(id))
            state.manufacturersId.push(id);
        return {
            manufacturersId: [...state.manufacturersId],
        }
    }),
    removeManufacturer: (id) => set((state) => {
        return {
            manufacturersId: state.manufacturersId.filter((manufacturerId) => manufacturerId !== id),
        }
    }),
    clearManufacturer: () => set(() => ({manufacturersId: []})),
    initManufacturers: (params) => set(() => ({manufacturersId: params?.split(',') || []})),
    addColor: (id) => set((state) => {
        if (!state.colorsId.includes(id))
            state.colorsId.push(id);
        return {
            colorsId: [...state.colorsId],
        }
    }),
    removeColor: (id) => set((state) => {
        return {
            colorsId: state.colorsId.filter((colorId) => colorId !== id),
        }
    }),
    clearColors: () => set(() => ({colorsId: []})),
    initColors: (params) => set(() => ({colorsId: params?.split(',') || []}))
}))
export default useDefaultFiltersStore;