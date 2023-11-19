import { create } from 'zustand'

interface UserState {
    isAuth: boolean,
    setIsAuth: (bool: boolean) => void,
}

const useUserStore = create<UserState>()((set) => ({
    isAuth: false,
    setIsAuth: (bool) => set(() => ({ isAuth: bool })),
}))

export default useUserStore;