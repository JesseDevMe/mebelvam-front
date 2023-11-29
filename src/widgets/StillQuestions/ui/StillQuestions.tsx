'use client'
import {FC, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";

type Inputs = {
    name: string;
    telephone: string;
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

interface StillQuestionsProps {
    telephone: string;
}

const StillQuestions: FC<StillQuestionsProps> = ({ telephone }) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setStatus(STATUS.LOADING);
        fetch('/api/email/consultation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                telephone: data.telephone,
            })
        })
            .then(res => {
                if (!res.ok) {
                    setStatus(STATUS.FAILED);
                    throw new Error();
                } else {
                    setStatus(STATUS.DONE);
                    setIsModalOpen(true);
                    return res.json();
                }
            })
            .catch(error => setStatus(STATUS.FAILED));
    }

    return (
        <div className="w-full max-w-[480px] lg:w-[300px] text-center border-2 border-dark rounded p-7 bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)]">
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
                    <a className="mt-2.5 hover:text-accent" href={`tel:${telephone}`}>{telephone}</a>
                </div>

                <button
                    disabled={status === STATUS.DONE || status === STATUS.LOADING}
                    className="py-4 bg-dark hover:bg-black rounded text-light mt-7 font-montserrat font-semibold text-base
                        md:max-w-[250px] w-full md:mx-auto whitespace-nowrap text-center"
                    type="submit"
                >
                    {(status === STATUS.NO_ACTION || status === STATUS.FAILED) &&
                        'Оставить заявку'
                    }
                    {status === STATUS.LOADING &&
                        <>
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
                    }
                    {status === STATUS.DONE &&
                        <svg className="inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM18.3696 7.99374C18.6423 7.51346 18.474 6.90307 17.9937 6.63039C17.5135 6.35771 16.9031 6.52599 16.6304 7.00626L11.3447 16.3158L6.7348 11.3217C6.3602 10.9159 5.72754 10.8906 5.32172 11.2652C4.9159 11.6398 4.89059 12.2725 5.2652 12.6783L10.8037 18.6783C11.0202 18.9128 11.3356 19.0299 11.6527 18.9935C11.9698 18.957 12.2505 18.7713 12.4081 18.4937L18.3696 7.99374Z" fill="#F2F2F1"/>
                        </svg>
                    }
                </button>
                {status === STATUS.FAILED &&
                    <span className="text-red-600 mt-2.5">Не получилось оставить заявку. Пожалуйста, попробуйте позже или позвоните нам по
                    вышеуказанному номеру. С радостью поможем вам!
                </span>
                }

                {status === STATUS.DONE &&
                    <div
                        onClick={() => setIsModalOpen(false)}
                        className={`${isModalOpen ? 'flex' : 'hidden'} fixed p-2.5 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.667)] z-[110]`}
                    >
                        <div className="relative bg-fon border rounded-[5px] m-auto max-h-[400px] max-w-[400px] p-14">
                            <h3 className="text-xl font-montserrat font-semibold">Спасибо! <br/> Ваш запрос успешно отправлен</h3>
                            <p className="mt-6">
                                Ожидайте звонка от нашего менеджера
                            </p>

                            <svg onClick={() => {setIsModalOpen(false)}} className="absolute top-5 right-5 cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 19L19 1.32233" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1 1L19 18.6777" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>
                }
            </form>

        </div>
    );
};

export default StillQuestions;