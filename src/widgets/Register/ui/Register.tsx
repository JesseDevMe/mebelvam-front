'use client'
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import {getFavorites, routesSyncFavorites} from "@/shared/Utils";

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    isPoliceAgree: boolean;
}

interface RegisterProps {
    backHandler: () => void;
}

const Register: FC<RegisterProps> = ({ backHandler }) => {
    const setClose = useLogInStore(state => state.setClose);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (submitData) => {
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
            .catch(error => console.log(error))
            .then(data => {
                if (data.error?.message === 'Email or Username are already taken') {
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
                    setClose();
                }
            })
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

            <form className="mt-[30px] flex flex-col items-center w-full max-w-[440px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className={`py-3 px-5 border-2 ${errors.email ? 'border-red-500' : 'border-dark'} rounded w-full max-w-[440px]`} type="email" placeholder="E-mail" {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})}/>
                {errors.email?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите Email</span>}
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
                        Я принимаю условия Пользовательского соглашения и даю своё согласие на обработку моей
                        персональной информации на условиях, определенных Политикой конфиденциальности.
                    </p>
                </label>
                <input className="py-[15px] bg-dark rounded max-w-[300px] w-full mt-[30px] text-light font-montserrat font-semibold cursor-pointer" value="Зарегистрироваться" type="submit"/>
            </form>
        </>
    );
};

export default Register;