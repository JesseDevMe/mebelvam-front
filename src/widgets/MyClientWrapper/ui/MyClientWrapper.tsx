'use client'
import {FC, useEffect, useState} from "react";
import {MyPersonalData} from "@/widgets/MyPersonalData";
import Link from "next/link";
import Image from "next/image";
import cart from "../../../../public/Pages/Cart/cart.svg";
import {LogOutBtn} from "@/features/LogOutBtn";
import secure from "../../../../public/Pages/My/secure.svg";
import {LogInButton} from "@/features/LogInButton";
import useUserStore from "@/entities/User/store/useUserStore";

interface MyClientWrapperProps {

}

const MyClientWrapper: FC<MyClientWrapperProps> = ({}) => {
    const isAuthStore = useUserStore(state => state.isAuth);
    const setIsAuth = useUserStore(state => state.setIsAuth);
    const [isAuthCheck, setIsAuthCheck] =
        useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setIsAuthCheck(true);
    }, [setIsAuth])

    return (
        <>
            {
                !isAuthCheck && <span className="ml-5">Загрузка...</span>
            }

            {
                isAuthStore && isAuthCheck &&
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="grow">
                        <MyPersonalData/>
                    </div>
                    <div>
                        <Link href='/cart' className="bg-fon border rounded py-8 px-7 flex flex-col gap-5 items-center justify-center
                        shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] lg:flex-row hover:scale-[102%]"
                        >
                            <Image className="w-10 h-auto" src={cart} alt=""/>
                            <span className="font-montserrat text-base lg:text-xl font-semibold">Корзина</span>
                        </Link>

                        <Link href='/favorites' className="mt-7 bg-fon border rounded py-8 px-7 flex flex-col gap-5 items-center justify-center
                        shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] lg:flex-row hover:scale-[102%]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="36" viewBox="0 0 40 36" fill="none">
                                <path d="M4.95123 19.4868L4.9496 19.4851C3.1014 17.6049 2.03924 15.0552 2.00107 12.3768C1.96289 9.69846 2.95198 7.11769 4.74649 5.18276C6.53982 3.24911 8.99429 2.11357 11.5841 2.00491C13.9166 1.90705 16.4646 3.29866 18.6516 5.29867C19.4157 5.99747 20.5869 5.99747 21.351 5.29867C23.5385 3.29823 26.0838 1.90706 28.4159 2.00491C31.0057 2.11357 33.4602 3.24911 35.2535 5.18276C37.048 7.11769 38.0371 9.69846 37.9989 12.3768C37.9608 15.0552 36.8986 17.6049 35.0504 19.4851L35.0488 19.4868L21.3986 33.4058C21.0208 33.791 20.5169 34 20 34C19.4831 34 18.9792 33.791 18.6014 33.4058L4.95123 19.4868Z" stroke="#292A2D" strokeWidth="4" strokeLinejoin="round"/>
                            </svg>
                            <span className="font-montserrat text-base lg:text-xl  font-semibold">Избранное</span>
                        </Link>

                        <LogOutBtn>
                            <div className="mt-7 bg-fon border rounded py-8 px-7 flex flex-col gap-5 items-center justify-center
                        shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] lg:flex-row hover:scale-[102%]"
                            >
                                <Image className="w-10 h-auto" src={secure} alt=""/>
                                <span className="font-montserrat text-base lg:text-xl font-semibold">Выйти из аккаунта</span>
                            </div>
                        </LogOutBtn>
                    </div>
                </div>
            }

            {
                (!isAuthStore && isAuthCheck) &&
                <LogInButton>
                    <span className="underline text-accent">Войдите</span> в свой аккаунт, чтобы посмотреть информацию
                </LogInButton>
            }
        </>
    );
};

export default MyClientWrapper;