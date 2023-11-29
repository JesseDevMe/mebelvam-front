'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

type Inputs = {
    email: string;
}

interface ResetPasswordProps {
    backHandler: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ backHandler }) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const setClose = useLogInStore(state => state.setClose);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setStatus(STATUS.LOADING);
        fetch('/api/user/me/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    email: data.email,
                }
            )
        })
            .then(res => {
                if (res.ok) {
                    setStatus(STATUS.DONE);
                    setTimeout(() => {
                        setClose();
                        setStatus(STATUS.NO_ACTION);
                    }, 2000);
                } else {
                    setStatus(STATUS.FAILED);
                }
            })
            .catch(error => setStatus(STATUS.FAILED))
    }

    return (
        <div>
            <div
                className="p-2.5 absolute left-5 top-3.5 cursor-pointer"
                onClick={backHandler}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <path d="M13 1C13 1 1 11.2292 1 12C1 12.7708 13 23 13 23" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            <h2 className="font-montserrat text-base text-center font-semibold">Восстановление пароля</h2>
            <div className="mt-5 text-center w-full max-w-[440px] mx-auto">
                <p>Для сброса пароля укажите адрес электронной почты.</p>
                <p className="mt-3.5">Если Ваша учетная запись есть в базе данных, на Ваш адрес электронной почты будет отправлено письмо, содержащее инструкции по восстановлению доступа.</p>
            </div>

            <form className="relative mt-[30px] flex flex-col items-center w-full max-w-[440px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className={`py-3 px-5 border-2 ${errors.email ? 'border-red-500' : 'border-dark'} rounded w-full mt-[30px]`} type="email" placeholder="E-mail" {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})}/>
                {errors.email?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите Email</span>}
                {errors.email?.type === 'pattern' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите корректный email</span>}

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
                        : 'Продолжить'
                    }
                </button>

                { status === STATUS.DONE &&
                    <div
                        className="absolute top-[110%] left-1/2 -translate-x-1/2 border border-green-400 text-green-400 rounded bg-fon py-2.5 px-5 whitespace-nowrap">
                        <span>Письмо успешно отправлено</span>
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
        </div>
    );
};

export default ResetPassword;