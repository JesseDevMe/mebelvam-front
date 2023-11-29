'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import {getCart, getFavorites, routesSyncCart, routesSyncFavorites} from "@/shared/Utils";
import useUserStore from "@/entities/User/store/useUserStore";
import Link from "next/link";

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    isPoliceAgree: boolean;
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

interface RegisterProps {
    backHandler: () => void;
}

const Register: FC<RegisterProps> = ({ backHandler }) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const setClose = useLogInStore(state => state.setClose);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (submitData) => {
        setStatus(STATUS.LOADING);
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    email: submitData.email,
                    password: submitData.password,
                }
            )
        })
            .then(res => res.json())
            .then(data => {
                if (data.error?.message === 'Email or Username are already taken') {
                    setStatus(STATUS.NO_ACTION);
                    setError('email', {type: 'email exist',})
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
                        setStatus(STATUS.NO_ACTION);
                        setClose();
                    }, 2000);
                } else {
                    setStatus(STATUS.FAILED);
                }
            })
            .catch(error => setStatus(STATUS.FAILED))
    }

    function passwordConfirmed(password: string): boolean {
        return watch('password') === password;
    }

    return (
        <>
            <div
                className="p-2.5 absolute left-5 top-3.5 cursor-pointer"
                onClick={backHandler}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <path d="M13 1C13 1 1 11.2292 1 12C1 12.7708 13 23 13 23" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            <h2 className="font-montserrat text-base text-center font-semibold">Регистрация</h2>

            <form className="relative mt-[30px] flex flex-col items-center w-full max-w-[440px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className={`py-3 px-5 border-2 ${errors.email ? 'border-red-500' : 'border-dark'} rounded w-full max-w-[440px]`} type="email" placeholder="E-mail" {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})}/>
                {errors.email?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите E-mail</span>}
                {errors.email?.type === 'pattern' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите корректный email</span>}
                {errors.email?.type === 'email exist' && <span className="self-start ml-2.5 mt-1 text-red-500">Аккаунт с такой почтой уже существует</span>}

                <input className={`mt-2.5 py-3 px-5 border-2 ${errors.password ? 'border-red-500' : 'border-dark'} border-dark rounded w-full max-w-[440px]`} placeholder="Придумайте пароль" type="password" {...register('password', {required: true, minLength: 8})}/>
                {errors.password?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите пароль</span>}
                {errors.password?.type === 'minLength' && <span className="self-start ml-2.5 mt-1 text-red-500">Пароль слишком короткий</span>}

                <input className={`mt-2.5 py-3 px-5 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-dark'} border-dark rounded w-full max-w-[440px]`} placeholder="Повторите пароль" type="password" {...register('confirmPassword', {required: true, validate:(value) => passwordConfirmed(value)})}/>
                {errors.confirmPassword?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Подтвердите пароль</span>}
                {errors.confirmPassword?.type === 'validate' && <span className="self-start ml-2.5 mt-1 text-red-500">Пароли не совпадают</span>}

                <label className="flex flex-row gap-x-2.5 mt-5 cursor-pointer w-full max-w-[440px]">
                    <input className="self-start" type='checkbox' {...register('isPoliceAgree', {required: true})}/>
                    <p className={`${errors.isPoliceAgree && 'text-red-500'}`}>
                        Я принимаю условия <Link href="/policy" className="underline">Пользовательского соглашения</Link> и даю своё согласие на обработку моей
                        персональной информации на условиях, определенных <Link href="/policy" className="underline">Политикой конфиденциальности</Link>.
                    </p>
                </label>
                <button
                    disabled={status === STATUS.DONE || status === STATUS.LOADING}
                    className="py-[15px] bg-dark hover:bg-black rounded max-w-[300px] w-full mt-[30px]
                        text-light font-montserrat font-semibold cursor-pointer"
                    type="submit"
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
                        : 'Зарегистрироваться'
                    }
                </button>

                { status === STATUS.DONE &&
                    <div
                        className="absolute top-[110%] left-1/2 -translate-x-1/2 border border-green-400 text-green-400 rounded bg-fon py-2.5 px-5 whitespace-nowrap">
                        <span>Вы успешно зарегистрированы</span>
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
        </>
    );
};

export default Register;