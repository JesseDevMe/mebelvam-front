import { create } from 'zustand'

interface LogInState {
    isOpen: boolean;
    setOpen: () => void;
    setClose: () => void;
}

const useLogInStore = create<LogInState>()((set) => ({
    isOpen: false,
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
}))

export default useLogInStore;