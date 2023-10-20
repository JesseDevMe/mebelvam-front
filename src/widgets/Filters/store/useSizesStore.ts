import { create } from 'zustand'
import {ReadonlyURLSearchParams} from "next/navigation";

export type min_max = {
    min: number;
    max: number;
}

interface SizesState {
    width?: min_max;
    setWidth: (min: number, max: number) => void;
    height?: min_max;
    setHeight: (min: number, max: number) => void;
    depth?: min_max;
    setDepth: (min: number, max: number) => void;
    clear: () => void
    init: (params: ReadonlyURLSearchParams) => void;
}

const useSizesStore = create<SizesState>()((set) => ({
    setWidth: (min, max) => set((state) => ({
        width: {
            min: min,
            max: max
        }
    })),
    setHeight: (min, max) => set((state) => ({
        height: {
            min: min,
            max: max
        }
    })),
    setDepth: (min, max) => set((state) => ({
        depth: {
            min: min,
            max: max
        }
    })),
    clear: () => set(() => ({
        width: undefined,
        height: undefined,
        depth: undefined
    })),
    init: (params) => set((state) => {
        const widthTokens = params.get('width')?.split('-');
        const heightTokens = params.get('height')?.split('-');
        const depthTokens = params.get('depth')?.split('-');

        return {
            width: widthTokens && {
                min: parseInt(widthTokens[0]),
                max: parseInt(widthTokens[1])
            },
            height: heightTokens && {
                min: parseInt(heightTokens[0]),
                max: parseInt(heightTokens[1])
            },
            depth: depthTokens && {
                min: parseInt(depthTokens[0]),
                max: parseInt(depthTokens[1])
            }
        }
    })
}))

export default useSizesStore;