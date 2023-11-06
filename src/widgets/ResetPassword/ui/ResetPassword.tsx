'use client'
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";


type Inputs = {
    email: string;
}

interface ResetPasswordProps {
    backHandler: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ backHandler }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
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

            <form className="mt-[30px] flex flex-col items-center w-full max-w-[440px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className={`py-3 px-5 border-2 ${errors.email ? 'border-red-500' : 'border-dark'} rounded w-full mt-[30px]`} type="email" placeholder="E-mail" {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})}/>
                {errors.email?.type === 'required' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите Email</span>}
                {errors.email?.type === 'pattern' && <span className="self-start ml-2.5 mt-1 text-red-500">Введите корректный email</span>}

                <input className="py-[15px] bg-dark rounded max-w-[300px] w-full mt-[30px] text-light font-montserrat font-semibold cursor-pointer" value="Продолжить" type="submit"/>
            </form>
        </div>
    );
};

export default ResetPassword;