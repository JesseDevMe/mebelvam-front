import { create } from 'zustand'
import {attr, variant} from "@/entities/Furniture";

interface CardState {
    curVariant: variant;
    curAttr: attr;
    increase: (by: number) => void
}

const useCardStore = create<CardState>()((set) => ({
    curVariant: {},
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))