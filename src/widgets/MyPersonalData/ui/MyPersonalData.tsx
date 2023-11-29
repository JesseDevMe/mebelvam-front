'use client'
import {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {routesGetMe, routesUpdateMe} from "@/shared/Utils/RouteHandlers";
import {UserData} from "@/entities/User";
import {LogInButton} from "@/features/LogInButton";
import useUserStore from "@/entities/User/store/useUserStore";

type Inputs = {
    name: string;
    middleName: string;
    telephone: string;
    email: string;
}

enum FetchStatus {
    LOADING,
    DONE,
    FAILED,
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

interface MyPersonalDataProps {

}

const MyPersonalData: FC<MyPersonalDataProps> = ({}) => {
    const [actionStatus, setActionStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError,
    } = useForm<Inputs>();

    const dataSubmitHandler: SubmitHandler<Inputs> = (submitData) =>  {
        setActionStatus(STATUS.LOADING);
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuth(false);
            setActionStatus(STATUS.NO_ACTION);
            return;
        }
        routesUpdateMe({
            name: submitData.name,
            middleName: submitData.middleName,
            email: submitData.email,
            telephone: submitData.telephone,
        }, token)
            .then(() => {
                setActionStatus(STATUS.DONE);
                setFetchStatus(FetchStatus.LOADING);
                routesGetMe(token)
                    .then((data: UserData) => {
                        data.name && setValue('name', data.name);
                        data.middleName && setValue('middleName', data.middleName);
                        data.telephone && setValue('telephone', data.telephone);
                        data.email && setValue('email', data.email);
                        setFetchStatus(FetchStatus.DONE);
                    })
                    .catch((error) => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        } else setFetchStatus(FetchStatus.FAILED);
                    })
            })
            .catch(error => {
                if (error === 'Email is exist') {
                    setActionStatus(STATUS.NO_ACTION);
                    setError('email', {type: 'email exist'});
                    return;
                }

                if (error === 401) {
                    setActionStatus(STATUS.NO_ACTION);
                    setIsAuth(false);
                    localStorage.removeItem('token');
                    return;
                }

                setActionStatus(STATUS.FAILED);
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuth(false);
            return;
        }

        routesGetMe(token)
            .catch((error) => {
                if (error === 401) {
                    localStorage.removeItem('token');
                    setIsAuth(false);
                } else setFetchStatus(FetchStatus.FAILED);
            })
            // @ts-ignore
            .then((data: UserData) => {
                data.name && setValue('name', data.name);
                data.middleName && setValue('middleName', data.middleName);
                data.telephone && setValue('telephone', data.telephone);
                data.email && setValue('email', data.email);
                setFetchStatus(FetchStatus.DONE);
            })
    }, [setIsAuth, setValue])

    return (
        <div className="bg-fon border rounded py-5 px-5 shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)]">
            { fetchStatus === FetchStatus.DONE &&
                <form
                    onSubmit={handleSubmit(dataSubmitHandler)}
                    className="flex flex-col gap-y-4"
                >
                    <div>
                        <p className={`${watch('name', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Имя</p>
                        <input
                            placeholder="Имя"
                            className="font-montserrat text-base border-b-2 border-dark py-1 font-semibold w-full"
                            {...register('name')}
                        />
                    </div>

                    <div>
                        <p className={`${watch('middleName', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Отчество</p>
                        <input
                            placeholder="Отчество"
                            className="font-montserrat text-base border-b-2 border-dark py-1 font-semibold w-full"
                            {...register('middleName')}
                        />
                    </div>

                    <div>
                        <p className={`${watch('telephone', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Телефон</p>
                        <input
                            placeholder="Телефон"
                            type="tel"
                            className={`font-montserrat text-base border-b-2 ${errors.telephone ? 'border-red-500' : 'border-dark'} py-1 font-semibold w-full`}
                            {...register('telephone', {required: false, pattern: /^[\d+\s()]+$/,})}
                        />
                        {errors.telephone?.type === 'pattern' &&
                            <p className="text-red-600 mt-0.5">
                                Проверьте номер на валидность
                            </p>
                        }
                    </div>

                    <div>
                        <p className={`${watch('email', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>E-mail*</p>
                        <input
                            placeholder="E-mail*"
                            className={`font-montserrat text-base border-b-2 ${errors.email ? 'border-red-500' : 'border-dark'} py-1 font-semibold w-full`}
                            {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})}
                        />
                        {errors.email?.type === 'required' &&
                            <span className="self-start mt-1 text-red-500">Введите E-mail</span>}
                        {errors.email?.type === 'pattern' &&
                            <span className="self-start mt-1 text-red-500">Введите корректный email</span>}
                        {errors.email?.type === 'email exist' &&
                            <span className="self-start mt-1 text-red-500">Аккаунт с такой почтой уже существует</span>}
                    </div>

                    <button
                        disabled={actionStatus === STATUS.LOADING}
                        className="mt-10 bg-dark hover:bg-black rounded py-4 w-full text-light font-montserrat font-semibold text-base"
                        type="submit"
                    >
                        { actionStatus === STATUS.LOADING
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
                </form>
            }

            { fetchStatus === FetchStatus.LOADING &&
                <div>Получаем данные...</div>
            }

            { fetchStatus === FetchStatus.FAILED &&
                <div>Не получилось загрузить данные. Пожалуйста, попробуйте снова чуть позже.</div>
            }
        </div>
    );
};

export default MyPersonalData;