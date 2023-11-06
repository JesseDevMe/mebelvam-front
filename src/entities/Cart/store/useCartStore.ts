import { create } from 'zustand'
import {ReadonlyURLSearchParams} from "next/navigation";
import {CartFurniture} from "@/entities/Cart";

interface CartState {
    furnitures: CartFurniture[];
    setFurnitures: (items: CartFurniture[]) => void;
    remove: (attrId: number) => void;
}

const useCustomFiltersStore = create<CartState>()((set) => ({
    furnitures: [],
    setFurnitures: (items) => set((state) =>
        ({
            furnitures: items,
        })
    ),
    remove: (attrId) => set((state) =>
        ({
            furnitures: state.furnitures.filter(fur => fur.attrId !== attrId),
        })
    ),
}))

export default useCustomFiltersStore;