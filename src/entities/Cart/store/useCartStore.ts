import { create } from 'zustand'
import {CartFurniture} from "@/entities/Cart";

interface CartState {
    furnitures: CartFurniture[];
    setFurnitures: (items: CartFurniture[]) => void;
    remove: (attrId: number) => void;
}

const useCartStore = create<CartState>()((set) => ({
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

export default useCartStore;