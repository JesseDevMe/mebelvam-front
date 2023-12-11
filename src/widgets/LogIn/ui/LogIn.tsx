'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import {state} from "sucrase/dist/types/parser/traverser/base";
import Link from "next/link";
import {getCart, getFavorites, routesSyncCart, routesSyncFavorites} from "@/shared/Utils";
import useUserStore from "@/entities/User/store/useUserStore";

type Inputs = {
    email: string;
    password: string;
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}


interface LogInProps {
    resetHandler: () => void;
    registerHandler: () => void;
}

const strapiPublicUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const LogIn: FC<LogInProps> = ({ resetHandler, registerHandler }) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const setClose = useLogInStore(state => state.setClose);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (submitData) => {
        setStatus(STATUS.LOADING);
        fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(
                    {
                        identifier: submitData.email,
                        password: submitData.password,
                    }
                ),
            })
            .then(res => res.json())
            .then(data => {
                if (data.error?.status === 400) {
                    setStatus(STATUS.NO_ACTION);
                    setError('password', {message: '400'})
                    return;
                }

                if (data?.jwt) {
                    localStorage.setItem('token', data.jwt);

                    const favorites = getFavorites();
                    routesSyncFavorites(favorites, data.jwt)
                        .catch(error => console.log(error))
                        .then(data => {
                            localStorage.setItem('favorites', JSON.stringify(data));
                        })

                    const cart = getCart();
                    routesSyncCart(cart, data.jwt)
                        .catch(error => console.log(error));
                    setIsAuth(true);
                    setStatus(STATUS.DONE);
                    setTimeout(() => {
                        setClose();
                        setStatus(STATUS.NO_ACTION);
                    }, 2000);
                } else {
                    setStatus(STATUS.FAILED);
                }
            })
            .catch(error => setStatus(STATUS.FAILED));
    }

    return (
        <>
            <h2 className="font-montserrat text-base text-center font-semibold">Войти в личный кабинет</h2>
            <form className="relative mt-[30px] flex flex-col items-center w-full max-w-[440px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className={`py-3 px-5 border-2 ${errors.email ? 'border-red-500' : 'border-dark'} rounded w-full`} {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})} type={'email'} placeholder="E-mail"/>
                {errors.email?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите Email</span>}
                {errors.email?.type === 'pattern' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите корректный email</span>}

                <input className={`mt-2.5 py-3 px-5 border-2 ${errors.password ? 'border-red-500' : 'border-dark'} rounded w-full`} {...register('password', {required: true, })} type={'password'} placeholder="Пароль"/>
                {errors.password?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите пароль</span>}
                {errors.password?.message === '400' && <span className="self-start ml-2.5 mt-1 text-red-500">Неправильный логин или пароль</span>}

                <button
                    disabled={status === STATUS.DONE || status === STATUS.LOADING}
                    className="py-[15px] bg-dark hover:bg-black rounded max-w-[300px] w-full mt-[30px] text-light font-montserrat
                        font-semibold cursor-pointer" type="submit"
                >
                    { status === STATUS.LOADING
                        ? <>
                            <svg className="inline-block animate-spin h-5 w-5 text-white mr-3"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Обработка
                        </>
                        : 'Войти'
                    }
                </button>

                { status === STATUS.DONE &&
                    <div
                    className="absolute top-[110%] left-1/2 -translate-x-1/2 border border-green-400 text-green-400 rounded bg-fon py-2.5 px-5 whitespace-nowrap">
                    <span>Вы успешно вошли</span>
                    <svg className="ml-2.5 inline-block" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         viewBox="0 0 14 14" fill="none">
                        <path d="M1 6.14286L6.77926 13L13 1" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
                }

                { status === STATUS.FAILED &&
                    <div
                        className="absolute top-[110%] left-1/2 -translate-x-1/2 border border-red-500 text-red-500 rounded bg-fon py-2.5 px-5 whitespace-nowrap"
                    >
                        Произошла ошибка Х(
                    </div>
                }
            </form>
            <div
                className="py-5 mt-2.5 text-center max-w-[280px] mx-auto text-base font-montserrat cursor-pointer hover:text-accent"
                onClick={resetHandler}
            >
                Забыли пароль?
            </div>
            <div className="mt-[50px] flex flex-row gap-x-3.5 mx-auto w-fit">
                <Link href={strapiPublicUrl + '/api/connect/vk/'} className="w-12 h-12 border-dark border rounded-full cursor-pointer flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="15" viewBox="0 0 28 15" fill="none">
                        <path d="M15.2554 15C15.2554 15 15.7174 14.8257 15.9541 14.5762C16.1707 14.3476 16.1632 13 16.1632 13C16.1632 13 16.0472 11.2975 17 11C17.9391 10.7075 19.232 13.5524 20.5117 14.414C21.4783 15.0654 21.9999 15 21.9999 15H25.9999C25.9999 15 28 15 26.5718 13.3877C26.5017 13.2746 25.5295 12 23.4823 10.1343C21.3374 8.18136 21.9999 8.24003 24.5817 4.86136C26.1544 2.80393 27.1966 2.16767 27 1.63057C26.8134 1.11683 24.9999 1.00003 24.9999 1.00003H21.9999C21.9999 1.00003 21.429 1.15496 21.0701 1.36632C20.8635 1.488 20.7295 1.77191 20.7295 1.77191C20.7295 1.77191 20.121 3.36354 19.3084 4.71795C17.5943 7.57428 16.9094 7.72545 16.6289 7.54847C15.9766 7.13427 16.1394 5.88678 16.1394 5.00064C16.1394 2.23158 16.5676 1.0775 15.3067 0.778836C14.9999 0.706159 15.0704 0.614143 13.9999 0.603081C12.6263 0.589562 10.9745 0.607997 10.3159 0.923864C9.87762 1.13403 9 1.63057 9.74615 1.63057C10.0003 1.66375 10.5763 1.78297 10.8818 2.19102C11.2762 2.71828 11.2624 3.90063 11.2624 3.90063C11.2624 3.90063 11.4891 7.16008 10.7328 7.56444C10.2144 7.84221 9.50325 7.27562 7.97444 4.68354C7.19188 3.35616 6.60089 1.88867 6.60089 1.88867C6.60089 1.88867 6.48695 1.61459 6.28285 1.46711C6.03619 1.28889 5.69186 1.23359 5.69186 1.23359L2.03449 1.25694C2.03449 1.25694 1.09432 1.25699 0.999969 1.36632C0.905579 1.47571 0.999989 2.00003 0.999989 2.00003C0.999989 2.00003 4.133 8.72221 7.37593 12.037C10.3497 15.0752 13.7253 15 13.7253 15H15.2554Z" fill="#292A2D"/>
                    </svg>
                </Link>
                <Link href={strapiPublicUrl + '/api/connect/google/'} className="w-12 h-12 border-dark border rounded-full cursor-pointer flex justify-center items-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0001 4.62134C12.953 4.62134 14.2704 5.4649 15.0215 6.16978L17.9566 3.30401C16.1539 1.62845 13.8081 0.600006 11.0001 0.600006C6.93258 0.600006 3.41969 2.93423 1.70947 6.33156L5.07214 8.94312C5.91569 6.43556 8.24992 4.62134 11.0001 4.62134Z" fill="#292A2D"/>
                        <path d="M20.984 11.2311C20.984 10.376 20.9147 9.752 20.7644 9.10489H11V12.9644H16.7316C16.616 13.9236 15.992 15.368 14.6053 16.3387L17.8871 18.8809C19.8516 17.0667 20.984 14.3973 20.984 11.2311Z" fill="#292A2D"/>
                        <path d="M5.08365 13.0569C4.8641 12.4098 4.73699 11.7164 4.73699 11C4.73699 10.2836 4.8641 9.59022 5.0721 8.94311L1.70943 6.33156C1.00454 7.74134 0.600098 9.32445 0.600098 11C0.600098 12.6756 1.00454 14.2587 1.70943 15.6684L5.08365 13.0569Z" fill="#292A2D"/>
                        <path d="M11.0003 21.4C13.8083 21.4 16.1656 20.4756 17.8874 18.8809L14.6056 16.3387C13.7274 16.9511 12.5487 17.3787 11.0003 17.3787C8.25008 17.3787 5.91586 15.5645 5.08386 13.0569L1.72119 15.6685C3.43141 19.0658 6.93275 21.4 11.0003 21.4Z" fill="#292A2D"/>
                    </svg>

                </Link>
            </div>
            <button onClick={registerHandler} className="block py-[15px] bg-dark hover:bg-black rounded
                max-w-[300px] w-full mt-[30px] mx-auto text-light font-montserrat font-semibold
                cursor-pointer"
            >
                Зарегистрироваться
            </button>
        </>
    );
};

export default LogIn;