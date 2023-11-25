'use client'
import {FC, ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import useUserStore from "@/entities/User/store/useUserStore";

interface AccountLinkProps {
    isMobile?: boolean;
}

const AccountLink: FC<AccountLinkProps> = ({ isMobile }) => {
    const isAuth = useUserStore(state => state.isAuth);
    const setIsAuth = useUserStore(state => state.setIsAuth);
    const router = useRouter();
    const openModal = useLogInStore(state => state.setOpen);

    function linkHandler() {
        if (!localStorage?.getItem('token')) {
            setIsAuth(false);
            openModal();
        } else {
            setIsAuth(true);
            router.push('/my')
        }
    }

    useEffect(() => {
        if (localStorage?.getItem('token')) {
            setIsAuth(true);
        } else {
            setIsAuth(false)
        }
    }, [])

    return (
        <div onClick={linkHandler}>
            {!isMobile
                ? <svg className="cursor-pointer hover:scale-110 transition-transform" width="26" height="28" viewBox="0 0 25 24"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="6" r="4.25" stroke="#292A2D" strokeWidth="1.5"/>
                <path
                    d="M22.5 23V20.9737C22.5 20.3288 22.396 19.6881 22.1921 19.0763L21.8675 18.1026C21.0509 15.6526 18.758 14 16.1754 14H12.5H8.82456C6.24197 14 3.94914 15.6526 3.13246 18.1026L2.8079 19.0763C2.60397 19.6881 2.5 20.3288 2.5 20.9737V23"
                    stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                : <div className="cursor-pointer flex flex-col gap-1 items-center">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="6" r="4.25" stroke="#292A2D" strokeWidth="1.5"/>
                        <path d="M22.5 23V20.9737C22.5 20.3288 22.396 19.6881 22.1921 19.0763L21.8675 18.1026C21.0509 15.6526 18.758 14 16.1754 14H12.5H8.82456C6.24197 14 3.94914 15.6526 3.13246 18.1026L2.8079 19.0763C2.60397 19.6881 2.5 20.3288 2.5 20.9737V23" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <div className="hidden min-[390px]:block">{isAuth ? 'Кабинет' : 'Вход'}</div>
                </div>
            }
        </div>
    );
};

export default AccountLink;