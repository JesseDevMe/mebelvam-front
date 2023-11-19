'use client'
import {FC} from "react";
import {useFormContext} from "react-hook-form"

type Inputs = {
    name: string;
    middleName: string;
    telephone: string;
    address: string;
    note: string;
}

interface PersonalDataProps {

}

const PersonalData: FC<PersonalDataProps> = ({}) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<Inputs>()


    return (
        <div className="mt-[30px] border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] p-5">
            <p className="font-montserrat text-xl font-semibold">Личные данные</p>
            <form
                className="flex flex-col gap-y-4 mt-5"
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
                    <p className={`${watch('telephone', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Телефон*</p>
                    <input
                        placeholder="Телефон*"
                        type="tel"
                        className={`font-montserrat text-base border-b-2 ${errors.telephone ? 'border-red-500' : 'border-dark'} py-1 font-semibold w-full`}
                        {...register('telephone', { required: true, pattern: /^[\d+\s()]+$/, })}
                    />
                    {errors.telephone &&
                        <p className="text-red-600 mt-0.5">
                            {
                                errors.telephone.type === 'required'
                                    ? 'Введите телефон'
                                    : (errors.telephone.type === 'pattern' ? 'Проверьте номер на валидность' : '')
                            }
                        </p>
                    }
                </div>

                <div>
                    <p className={`${watch('address', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Адрес доставки*</p>
                    <input
                        placeholder="Адрес доставки*"
                        className={`font-montserrat text-base border-b-2 ${errors.telephone ? 'border-red-500' : 'border-dark'} py-1 font-semibold w-full`}
                        {...register('address', { required: true })}
                    />
                    { errors.address?.type === 'required' &&
                        <p className="text-red-600 mt-0.5">
                            Введите адрес доставки
                        </p>
                    }
                </div>

                <div>
                    <p className={`${watch('note', '')?.length === 0 ? 'text-transparent' : 'text-[#666]'}`}>Комментарии к заказу</p>
                    <input
                        placeholder="Комментарии к заказу"
                        className="font-montserrat text-base border-b-2 border-dark py-1 font-semibold w-full"
                        {...register('note')}
                    />
                </div>
            </form>
        </div>
    );
};

export default PersonalData;