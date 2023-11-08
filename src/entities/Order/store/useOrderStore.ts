import {create} from 'zustand'
import {CartFurniture} from "@/entities/Cart";

export enum METHOD {
    FREE,
    COURIER,
    PICKUP,
}

interface OrderState {
    furnitures: CartFurniture[];
    setFurnitures: (items: CartFurniture[]) => void;
    remove: (attrId: number) => void;

    method: METHOD;
    setMethod: (method: METHOD) => void;

    isLift: boolean;
    setIsLift: (bol: boolean) => void;

    isSetup: boolean;
    setIsSetup: (bol: boolean) => void;
}

const useOrderStore = create<OrderState>()((set) => ({
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

    method: METHOD.COURIER,
    setMethod: (method) => set(() => ({method: method})),

    isLift: false,
    setIsLift: (bol) => set(() => ({isLift: bol})),

    isSetup: false,
    setIsSetup: (bol) => set(() => ({isSetup: bol})),
}))

export default useOrderStore;