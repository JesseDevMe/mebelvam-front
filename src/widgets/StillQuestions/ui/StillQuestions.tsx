'use client'
import {FC} from "react";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    name: string;
    telephone: string;
}

interface StillQuestionsProps {

}

const StillQuestions: FC<StillQuestionsProps> = ({}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

    }

    return (
        <div className="w-full max-w-[480px] text-center border-2 border-dark rounded p-7 bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)]">
            <h2 className="font-montserrat text-xl font-semibold">Остались вопросы?</h2>
            <p className="mt-5 mx-auto">Оставьте заявку прямо сейчас, менеджер нашего интернет-магазина свяжется с Вами</p>
            <form className="flex flex-col mt-7" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={`py-3.5 px-5 border rounded ${errors.name?.type === 'required' ? 'border-red-600 outline-red-600' : 'border-dark outline-black'}`}
                    {...register("name", { required: true})}
                    placeholder="Ваше имя"
                    autoComplete="off"
                />
                {errors.name?.type === 'required' && <span className="text-red-600 mt-0.5">Введите Ваше имя</span>}

                <input
                    className={`py-3.5 px-5 mt-2.5 border rounded ${errors.telephone ? 'border-red-600 outline-red-600' : 'border-dark outline-black'}`}
                    type={"tel"}
                    {...register("telephone", { required: true, pattern: /^[\d+\s()]+$/, })}
                    placeholder="Телефон для связи"
                />

                {errors.telephone &&
                    <span className="text-red-600 mt-0.5">
                        {
                            errors.telephone.type === 'required'
                                ? 'Введите телефон'
                                : (errors.telephone.type === 'pattern' ? 'Проверьте номер на валидность' : '')
                        }
                    </span>
                }

                <div className="flex flex-col font-montserrat font-semibold text-base mt-7">
                    <span>Или</span>
                    <span className="font-roboto font-normal text-sm">позвоните по телефону:</span>
                    <a className="mt-2.5" href="tel:">+7 (978) подставить</a>
                </div>

                <input
                    className="py-4 px-14 bg-dark rounded text-light mt-7 font-montserrat font-semibold text-base md:w-fit md:mx-auto"
                    type="submit"
                    value="Оставить заявку"
                />
            </form>

        </div>
    );
};

export default StillQuestions;