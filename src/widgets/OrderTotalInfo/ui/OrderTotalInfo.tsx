'use client'
import {FC, useState} from "react";
import useOrderStore from "@/entities/Order/store/useOrderStore";
import {useFormContext} from "react-hook-form";
import {OrderFurInfo, OrderInfo} from "@/entities/Order/types";
import {deleteManyFromCart, getCart} from "@/shared/Utils";
import {CartItem} from "@/entities/Cart";
import Link from "next/link";
import useUserStore from "@/entities/User/store/useUserStore";

interface OrderTotalInfoProps {

}

type Inputs = {
    name: string;
    middleName: string;
    telephone: string;
    address: string;
    note: string;
}

enum STATUS {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

const OrderTotalInfo: FC<OrderTotalInfoProps> = ({}) => {
    const [status, setStatus] = useState<STATUS>(STATUS.NO_ACTION);
    const furnitures = useOrderStore(state => state.furnitures);
    const method = useOrderStore(state => state.method);
    const isLift = useOrderStore(state => state.isLift);
    const isSetup = useOrderStore(state => state.isSetup);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    const {
        trigger,
        getValues,
    } = useFormContext<Inputs>();

    function submitHandler() {
        if (status === STATUS.DONE || status === STATUS.LOADING) return;

        trigger(undefined, {shouldFocus: true}).then((bool) => {
            if (bool) {
                setStatus(STATUS.LOADING);
                const inputValues = getValues();
                const orderInfo: OrderInfo = {
                    furniture: furnitures.map((fur): OrderFurInfo => {
                        return {
                            id: fur.id,
                            name: fur.name,
                            color: fur.color,
                            size: fur.size,
                            price: fur.price,
                            count: fur.count,
                        }
                    }),
                    isLift,
                    isSetup,
                    method,
                    customerName: inputValues.name,
                    customerMiddleName: inputValues.middleName,
                    customerTelephone: inputValues.telephone,
                    customerAddress: inputValues.address,
                    customerNote: inputValues.note,
                }

                fetch('/api/email/send-order', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderInfo)
                })
                    .then(res => {
                        if (res.ok) {
                            setStatus(STATUS.DONE);
                            deleteManyFromCart(furnitures.map((fur): CartItem => ({
                                id: fur.id,
                                variant_id: fur.variantId,
                                attribute_id: fur.attrId,
                                count: fur.count
                            })));

                            const token = localStorage.getItem('token');
                            if (token) {
                                fetch('/api/user/cart', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + token,
                                    },
                                    body: JSON.stringify(getCart())
                                })
                                    .then(res => {
                                        if (res.status === 401) {
                                            localStorage.removeItem('token');
                                            setIsAuth(false);
                                        }
                                    })
                            }
                            setIsModalOpen(true);
                        } else {
                            setStatus(STATUS.FAILED);
                            setIsModalOpen(true);
                            throw new Error();
                        }
                    })
                    .catch((error) => {
                        setIsModalOpen(true)
                        setStatus(STATUS.FAILED);
                    })
            }

        });

    }

    function bgClickHandler() {
        setIsModalOpen(false);
    }

    return (
        <div className="relative border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-[30px] lg:min-w-[350px]">
            <div
                onClick={submitHandler}
                className="block cursor-pointer rounded bg-dark py-4 text-center text-light font-montserrat text-base font-semibold"
            >
                {(status === STATUS.NO_ACTION || status === STATUS.FAILED) &&
                    'Оформить заказ'
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
                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM18.3696 7.99374C18.6423 7.51346 18.474 6.90307 17.9937 6.63039C17.5135 6.35771 16.9031 6.52599 16.6304 7.00626L11.3447 16.3158L6.7348 11.3217C6.3602 10.9159 5.72754 10.8906 5.32172 11.2652C4.9159 11.6398 4.89059 12.2725 5.2652 12.6783L10.8037 18.6783C11.0202 18.9128 11.3356 19.0299 11.6527 18.9935C11.9698 18.957 12.2505 18.7713 12.4081 18.4937L18.3696 7.99374Z" fill="#F2F2F1"/>
                    </svg>
                }

            </div>
            <div className="mt-7">
                <div className="flex justify-between font-montserrat font-semibold ">
                    <span className="text-base">Количество товаров:</span>
                    <span>{furnitures.reduce((result, cur) => result + cur.count, 0)} шт.</span>
                </div>

                <div className="flex justify-between mt-6 font-roboto">
                    <span className="">Сумма скидки:</span>
                    <p className="">{furnitures.reduce((result, cur) => {
                        if (cur.oldPrice) {
                            return result + (cur.oldPrice - cur.price) * cur.count;
                        } else {
                            return result;
                        }
                    }, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>

                <div className="border-y-2 py-2.5 mt-3.5 text-[#666666]">
                    Стоимость заказа указана без учета доставки
                </div>

                <div className="flex justify-between mt-2 font-montserrat font-semibold text-xl">
                    <span>Итого:</span>
                    <p>{furnitures.reduce((result, cur) => result + cur.price * cur.count, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>
            </div>

            { isModalOpen &&
                <div
                    className="fixed top-0 left-0 w-full h-full z-[100] p-2.5 flex
                    bg-[rgba(0,0,0,0.667)] overflow-auto"
                    onClick={bgClickHandler}
                >
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="relative py-5 px-5 border rounded bg-fon w-full max-w-[600px] h-[390px] flex
                        flex-col gap-y-5 items-center justify-center text-center mx-auto my-auto"
                    >
                        <div
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-5 top-5 cursor-pointer"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 19L19 1.32233" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1 1L19 18.6777" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        {status === STATUS.FAILED &&
                            <>
                                <h2 className="font-montserrat text-base font-semibold max-w-[300px] md:text-xl">При оформлении заказа произошла ошибка</h2>
                                <div className="mt-7">
                                    <p>Пожалуйста, попробуйте позже</p>
                                    <p className="font-bold">или</p>
                                    <p>позвоните <Link className="font-semibold underline" href="/#consultation">нам</Link></p>
                                </div>
                                <p className="max-w-[300px]">Мы с радостью поможем вам оформить заказ</p>
                            </>
                        }

                        {status === STATUS.DONE &&
                            <>
                                <h2 className="font-montserrat text-base font-semibold md:text-xl">Спасибо, что выбрали нас!</h2>
                                <p className="max-w-[440px] mt-[30px]">Заказ успешно оформлен. Ожидайте звонка от нашего менеджера для уточнения информации.</p>
                                <Link href={'/'} className="bg-dark rounded py-3.5 max-w-[270px] w-full text-center
                                    mt-[30px] text-light font-montserrat text-base font-semibold"
                                >
                                    На главную
                                </Link>
                            </>
                        }

                    </div>
                </div>
            }

        </div>
    );
};

export default OrderTotalInfo;