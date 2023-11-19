'use client'
import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter, useSearchParams} from "next/navigation";

type Inputs = {
    password: string;
    confirmPassword: string;
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const urlParams = useSearchParams();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (submitData) => {
        setStatus(STATUS.LOADING);
        const code = urlParams.get('code');

        if (!code) {
            setStatus(STATUS.FAILED);
            return;
        }

        fetch('/api/user/me/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    code: code,
                    password: submitData.password,
                    passwordConfirmation: submitData.password,
                }
            )
        })
            .then(res => {
                if (res.ok) {
                    setStatus(STATUS.DONE);
                } else {
                    setStatus(STATUS.FAILED);
                }
            })
            .catch((error) => {
                setStatus(STATUS.FAILED);
            })
    }

    function passwordConfirmed(password: string): boolean {
        return watch('password') === password;
    }

    return (
        <div className="max-w-[1520px] pt-12 md:pt-16 lg:pt-20 w-full mx-auto bg-fon pb-12 px-2.5 md:px-5 lg:px-10 xl:px-20">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl">
                Восстановление пароля
            </h1>
            <div className="mt-8">
                <div className="border rounded px-5 py-7 shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] max-w-[500px] mx-auto">
                    <form className="relative flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input className={`mt-2.5 py-3 px-5 border-2 ${errors.password ? 'border-red-500' : 'border-dark'} border-dark rounded w-full max-w-[440px]`} placeholder="Придумайте пароль" type="password" {...register('password', {required: true, minLength: 8})}/>
                        {errors.password?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите пароль</span>}
                        {errors.password?.type === 'minLength' && <span className="self-start ml-2.5 mt-1 text-red-500">Пароль слишком короткий</span>}

                        <input className={`mt-2.5 py-3 px-5 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-dark'} border-dark rounded w-full max-w-[440px]`} placeholder="Повторите пароль" type="password" {...register('confirmPassword', {required: true, validate:(value) => passwordConfirmed(value)})}/>
                        {errors.confirmPassword?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Подтвердите пароль</span>}
                        {errors.confirmPassword?.type === 'validate' && <span className="self-start ml-2.5 mt-1 text-red-500">Пароли не совпадают</span>}

                        <div>
                            <button
                                disabled={status === STATUS.DONE || status === STATUS.LOADING}
                                className="py-[15px] bg-dark rounded max-w-[200px] w-full mt-[30px] text-light font-montserrat font-semibold cursor-pointer"
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
                                    : 'Сохранить'
                                }
                            </button>

                            {status === STATUS.DONE &&
                                <div
                                    className="mt-5 w-fit border border-green-400 text-green-400 rounded bg-fon py-2.5 px-5 whitespace-nowrap"
                                >
                                    <span>Новый пароль установлен</span>
                                    <svg className="ml-2.5 inline-block" xmlns="http://www.w3.org/2000/svg" width="14"
                                         height="14"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M1 6.14286L6.77926 13L13 1" stroke="#4ade80" strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            }

                            {status === STATUS.FAILED &&
                                <div
                                    className="mt-5 w-fit border border-red-500 text-red-500 rounded bg-fon py-2.5 px-5 "
                                >
                                    Ссылка недействительна
                                </div>
                            }
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Page;