import { create } from 'zustand'
import {ReadonlyURLSearchParams} from "next/navigation";

export type min_max = {
    min: number;
    max: number;
}

interface PriceState {
    price?: min_max;
    setPrice: (min: number, max: number) => void;
    clear: () => void;
    init: (param: string | null) => void;
}

const usePriceStore = create<PriceState>()((set) => ({
    setPrice: (min, max) => set((state) => ({
        price: {
            min: min,
            max: max
        }
    })),
    clear: () => set((state) => ({price: undefined})),
    init: (param) => set(() => {
        if (!param) return {};
        const priceTokens = param.split('-');
        const minValue = Number(priceTokens[0]);
        const maxValue = Number(priceTokens[1]);

        if (Number.isInteger(minValue) && Number.isInteger(maxValue)) {
            return {
                price: {
                    min: minValue,
                    max: maxValue,
                }
            };
        } else return {};

    })
}))

export default usePriceStore;