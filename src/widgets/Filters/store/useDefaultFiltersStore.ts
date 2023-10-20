import { create } from 'zustand'

interface DefaultFiltersState {
    manufacturersId: string[];
    addManufacturer: (id: string) => void;
    removeManufacturer: (id: string) => void;
    clearManufacturer: () => void;
    initManufacturers: (params: string | null) => void;
}

const useDefaultFiltersStore = create<DefaultFiltersState>()((set) => ({
    manufacturersId: [],
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
    initManufacturers: (params) => set(() => ({manufacturersId: params?.split(',') || []}))
}))
export default useDefaultFiltersStore;