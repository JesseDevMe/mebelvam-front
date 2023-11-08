'use client'
import {FC, useEffect, useState} from "react";
import Image from "next/image";
import freeBus from "@/../public/Pages/Cart/FreeBus.svg";
import useOrderStore, {METHOD} from "@/entities/Order/store/useOrderStore";

interface OrderDeliveryProps {

}

const OrderDelivery: FC<OrderDeliveryProps> = ({}) => {
    const furnitures = useOrderStore(state => state.furnitures);
    const method = useOrderStore(state => state.method);
    const setMethod = useOrderStore(state => state.setMethod);

    const isLift = useOrderStore(state => state.isLift);
    const setIsLift = useOrderStore(state => state.setIsLift);

    const isSetup = useOrderStore(state => state.isSetup);
    const setIsSetup = useOrderStore(state => state.setIsSetup);

    function handleLiftChange() {
        if (isLift) {
            setIsLift(false);
        } else {
            setIsLift(true);
        }
    }

    function handleSetupChange() {
        if (isSetup) {
            setIsSetup(false);
        } else {
            setIsSetup(true);
        }
    }

    function freeHandler() {
        if (furnitures.reduce((result, fur) => result + fur.price * fur.count, 0) >= 7000)
            setMethod(METHOD.FREE);
    }

    function courierHandler() {
        setMethod(METHOD.COURIER);
    }

    function pickupHandler() {
        setMethod(METHOD.PICKUP);
    }

    useEffect(() => {
        if (furnitures.reduce((result, fur) => result + fur.price * fur.count, 0) >= 7000) {
            setMethod(METHOD.FREE);
        } else {
            setMethod(METHOD.COURIER);
        }
    }, [furnitures])

    return (
        <div className="mt-[30px] border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] p-5">
            <p className="font-montserrat text-xl font-semibold">Доставка</p>
            <div className="grid grid-cols-1 gap-y-10 gap-x-[30px] mt-5 md:grid-cols-2">
                <div className="flex flex-col gap-y-5">
                    <div
                        className={`cursor-pointer border border-dark rounded px-2.5 py-4 flex flex-col items-center gap-3.5 font-montserrat 
                                text-base ${method === METHOD.FREE && 'bg-dark text-light'}`}
                        onClick={freeHandler}
                    >
                        <div className="font-semibold">
                            <svg className="inline-block mr-4" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 6.16667C0 4.97005 0.97005 4 2.16667 4H19.8333C21.03 4 22 4.97005 22 6.16667V8.24378L25.7258 9.29853C27.6628 9.84691 29 11.6152 29 13.6284V19.8333C29 19.8894 28.9979 19.945 28.9937 20H29C29.5523 20 30 20.4477 30 21C30 21.5523 29.5523 22 29 22H27C26.9881 22 26.9763 21.9998 26.9645 21.9994C26.9879 22.1629 27 22.33 27 22.5C27 24.433 25.433 26 23.5 26C21.567 26 20 24.433 20 22.5C20 22.327 20.0126 22.1569 20.0368 21.9906C19.9698 21.9968 19.902 22 19.8333 22H9.96463C9.98799 22.1633 10.0001 22.3303 10.0001 22.5C10.0001 24.433 8.43308 26 6.50008 26C4.56708 26 3.00008 24.433 3.00008 22.5C3.00008 22.3303 3.01217 22.1633 3.03553 22H2.16667C0.970052 22 0 21.03 0 19.8333V6.16667ZM22 19.3368C22.4546 19.1208 22.9632 19 23.5 19C24.4536 19 25.3182 19.3814 25.9495 20H26.8333C26.9254 20 27 19.9254 27 19.8333V13.6284C27 12.5099 26.2571 11.5276 25.181 11.2229L22 10.3224L22 19.3368ZM9 20C8.98349 20 8.96708 20.0004 8.95076 20.0012C8.31939 19.3819 7.45434 19 6.50008 19C5.51834 19 4.63101 19.4042 3.99542 20.0553C3.89246 20.0195 3.78184 20 3.66667 20H2.16667C2.07462 20 2 19.9254 2 19.8333V6.16667C2 6.07462 2.07462 6 2.16667 6H19.8333C19.9254 6 20 6.07462 20 6.16667L20 7.67758V8.99998V19.8345C19.9994 19.926 19.925 20 19.8333 20H9ZM6.50008 24C7.32851 24 8.00008 23.3284 8.00008 22.5C8.00008 21.6716 7.32851 21 6.50008 21C5.67165 21 5.00008 21.6716 5.00008 22.5C5.00008 23.3284 5.67165 24 6.50008 24ZM25 22.5C25 23.3284 24.3284 24 23.5 24C22.6716 24 22 23.3284 22 22.5C22 21.6716 22.6716 21 23.5 21C24.3284 21 25 21.6716 25 22.5Z"
                                      fill={method === METHOD.FREE ? '#F2F2F1' : '#292A2D'}
                                />
                                <path d="M4.31223 9.60156V16H3.46408V9.60156H4.31223ZM6.99289 12.48V13.1743H4.12766V12.48H6.99289ZM7.42795 9.60156V10.2959H4.12766V9.60156H7.42795ZM8.74437 11.9922V16H7.93139V11.2451H8.7224L8.74437 11.9922ZM10.2297 11.2188L10.2253 11.9746C10.1579 11.96 10.0935 11.9512 10.032 11.9482C9.97338 11.9424 9.906 11.9395 9.82982 11.9395C9.64232 11.9395 9.4768 11.9688 9.33324 12.0273C9.18969 12.0859 9.06811 12.168 8.9685 12.2734C8.86889 12.3789 8.78978 12.5049 8.73119 12.6514C8.67553 12.7949 8.63891 12.9531 8.62133 13.126L8.39281 13.2578C8.39281 12.9707 8.42064 12.7012 8.47631 12.4492C8.5349 12.1973 8.62426 11.9746 8.74437 11.7812C8.86449 11.585 9.01684 11.4326 9.20141 11.3242C9.38891 11.2129 9.61156 11.1572 9.86937 11.1572C9.92797 11.1572 9.99535 11.1646 10.0715 11.1792C10.1477 11.1909 10.2004 11.2041 10.2297 11.2188ZM12.5964 16.0879C12.2654 16.0879 11.9651 16.0322 11.6956 15.9209C11.429 15.8066 11.199 15.647 11.0056 15.4419C10.8152 15.2368 10.6687 14.9937 10.5662 14.7124C10.4636 14.4312 10.4124 14.1235 10.4124 13.7896V13.605C10.4124 13.2183 10.4695 12.874 10.5837 12.5723C10.698 12.2676 10.8533 12.0098 11.0496 11.7988C11.2459 11.5879 11.4685 11.4282 11.7175 11.3198C11.9666 11.2114 12.2244 11.1572 12.491 11.1572C12.8308 11.1572 13.1238 11.2158 13.3699 11.333C13.6189 11.4502 13.8225 11.6143 13.9807 11.8252C14.1389 12.0332 14.2561 12.2793 14.3323 12.5635C14.4085 12.8447 14.4465 13.1523 14.4465 13.4863V13.8511H10.8958V13.1875H13.6336V13.126C13.6218 12.915 13.5779 12.71 13.5017 12.5107C13.4285 12.3115 13.3113 12.1475 13.1502 12.0186C12.989 11.8896 12.7693 11.8252 12.491 11.8252C12.3064 11.8252 12.1365 11.8647 11.9812 11.9438C11.8259 12.02 11.6926 12.1343 11.5813 12.2866C11.47 12.439 11.3836 12.625 11.322 12.8447C11.2605 13.0645 11.2297 13.3179 11.2297 13.605V13.7896C11.2297 14.0151 11.2605 14.2275 11.322 14.4268C11.3865 14.623 11.4788 14.7959 11.5989 14.9453C11.7219 15.0947 11.8699 15.2119 12.0427 15.2969C12.2185 15.3818 12.4177 15.4243 12.6404 15.4243C12.9275 15.4243 13.1707 15.3657 13.3699 15.2485C13.5691 15.1313 13.7434 14.9746 13.8928 14.7783L14.385 15.1694C14.2825 15.3247 14.1521 15.4727 13.9939 15.6133C13.8357 15.7539 13.6409 15.8682 13.4094 15.9561C13.1809 16.0439 12.9099 16.0879 12.5964 16.0879ZM17.0989 16.0879C16.7679 16.0879 16.4676 16.0322 16.198 15.9209C15.9314 15.8066 15.7014 15.647 15.5081 15.4419C15.3177 15.2368 15.1712 14.9937 15.0686 14.7124C14.9661 14.4312 14.9148 14.1235 14.9148 13.7896V13.605C14.9148 13.2183 14.972 12.874 15.0862 12.5723C15.2005 12.2676 15.3557 12.0098 15.552 11.7988C15.7483 11.5879 15.971 11.4282 16.22 11.3198C16.469 11.2114 16.7268 11.1572 16.9934 11.1572C17.3333 11.1572 17.6262 11.2158 17.8723 11.333C18.1214 11.4502 18.325 11.6143 18.4832 11.8252C18.6414 12.0332 18.7586 12.2793 18.8347 12.5635C18.9109 12.8447 18.949 13.1523 18.949 13.4863V13.8511H15.3982V13.1875H18.136V13.126C18.1243 12.915 18.0804 12.71 18.0042 12.5107C17.9309 12.3115 17.8137 12.1475 17.6526 12.0186C17.4915 11.8896 17.2718 11.8252 16.9934 11.8252C16.8089 11.8252 16.6389 11.8647 16.4837 11.9438C16.3284 12.02 16.1951 12.1343 16.0838 12.2866C15.9724 12.439 15.886 12.625 15.8245 12.8447C15.763 13.0645 15.7322 13.3179 15.7322 13.605V13.7896C15.7322 14.0151 15.763 14.2275 15.8245 14.4268C15.8889 14.623 15.9812 14.7959 16.1013 14.9453C16.2244 15.0947 16.3723 15.2119 16.5452 15.2969C16.721 15.3818 16.9202 15.4243 17.1429 15.4243C17.43 15.4243 17.6731 15.3657 17.8723 15.2485C18.0716 15.1313 18.2459 14.9746 18.3953 14.7783L18.8875 15.1694C18.7849 15.3247 18.6546 15.4727 18.4964 15.6133C18.3382 15.7539 18.1433 15.8682 17.9119 15.9561C17.6834 16.0439 17.4124 16.0879 17.0989 16.0879Z"
                                      fill={method === METHOD.FREE ? '#F2F2F1' : '#292A2D'}
                                />
                            </svg>
                            <span>Бесплатная доставка</span>
                        </div>
                        <p>при заказе от 7 000 руб.*</p>
                    </div>

                    <div
                        className={`cursor-pointer border border-dark rounded px-2.5 py-4 flex flex-col items-center gap-3.5 font-montserrat 
                                text-base ${method === METHOD.COURIER && 'bg-dark text-light'}`}
                        onClick={courierHandler}
                    >
                        <div className="font-semibold">
                            <svg className="inline-block mr-4" xmlns="http://www.w3.org/2000/svg" width="31" height="28"
                                 viewBox="0 0 31 28" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M15.7227 2.44365L3.85704 6.13517L14.9355 9.46301H16.7679V9.50085L27.7769 6.19386L15.7227 2.44365ZM14.4346 11.7489L3.05599 8.33088V20.2196L14.4346 24.9396V11.7489ZM16.7679 25.0403V11.9372L28.3893 8.44623V20.2196L16.7679 25.0403ZM30.7227 4.66667L15.7227 0L0.722656 4.66667V21.7778L15.7227 28L30.7227 21.7778V4.66667Z"
                                      fill={method === METHOD.COURIER ? '#F2F2F1' : '#292A2D'}
                                />
                            </svg>
                            <span>Доставка курьером</span>
                        </div>
                        <p>от 500 руб.</p>
                    </div>

                    <div
                        className={`cursor-pointer border border-dark rounded px-2.5 py-4 flex flex-col items-center gap-3.5 font-montserrat 
                                text-base ${method === METHOD.PICKUP && 'bg-dark text-light'}`}
                        onClick={pickupHandler}
                    >
                        <div className="font-semibold">
                            <svg className="inline-block mr-4" width="31" height="22" viewBox="0 0 31 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M0.944336 2.1667C0.944336 0.970081 1.91439 3.05176e-05 3.111 3.05176e-05H20.7777C21.9743 3.05176e-05 22.9443 0.970083 22.9443 2.1667V4.24381L26.6701 5.29856C28.6072 5.84694 29.9443 7.61519 29.9443 9.6284V15.8333C29.9443 15.8894 29.9422 15.945 29.938 16H29.9443C30.4966 16 30.9443 16.4477 30.9443 17C30.9443 17.5523 30.4966 18 29.9443 18H27.9443C27.9324 18 27.9206 17.9998 27.9088 17.9994C27.9322 18.1629 27.9443 18.3301 27.9443 18.5C27.9443 20.433 26.3773 22 24.4443 22C22.5113 22 20.9443 20.433 20.9443 18.5C20.9443 18.327 20.9569 18.1569 20.9811 17.9906C20.9142 17.9968 20.8463 18 20.7777 18H10.909C10.9323 18.1633 10.9444 18.3303 10.9444 18.5C10.9444 20.433 9.37741 22 7.44442 22C5.51142 22 3.94442 20.433 3.94442 18.5C3.94442 18.3303 3.9565 18.1633 3.97986 18H3.111C1.91439 18 0.944336 17.03 0.944336 15.8334V2.1667ZM22.9443 15.3368C23.399 15.1209 23.9075 15 24.4443 15C25.398 15 26.2625 15.3814 26.8938 16H27.7777C27.8697 16 27.9443 15.9254 27.9443 15.8333V9.6284C27.9443 8.50995 27.2015 7.52759 26.1253 7.22293L22.9443 6.32241L22.9443 15.3368ZM9.94434 16C9.92783 16 9.91142 16.0004 9.8951 16.0012C9.26373 15.3819 8.39867 15 7.44442 15C6.46267 15 5.57534 15.4043 4.93975 16.0553C4.83679 16.0195 4.72617 16 4.611 16H3.111C3.01895 16 2.94434 15.9254 2.94434 15.8334V2.1667C2.94434 2.07465 3.01896 2.00003 3.111 2.00003H20.7777C20.8697 2.00003 20.9443 2.07465 20.9443 2.1667L20.9443 3.67761V5.00001V15.8345C20.9437 15.926 20.8693 16 20.7777 16H9.94434ZM7.44442 20C8.27284 20 8.94442 19.3285 8.94442 18.5C8.94442 17.6716 8.27284 17 7.44442 17C6.61599 17 5.94442 17.6716 5.94442 18.5C5.94442 19.3285 6.61599 20 7.44442 20ZM25.9443 18.5C25.9443 19.3285 25.2728 20 24.4443 20C23.6159 20 22.9443 19.3285 22.9443 18.5C22.9443 17.6716 23.6159 17 24.4443 17C25.2728 17 25.9443 17.6716 25.9443 18.5Z"
                                      fill={method === METHOD.PICKUP ? '#F2F2F1' : '#292A2D'}
                                />
                            </svg>
                            <span>Самовывоз</span>
                        </div>
                        <p>0 руб.</p>
                    </div>
                </div>

                <div className="border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] py-5 px-4 text-center">
                    <p className="font-montserrat text-base font-semibold">Доставка курьером</p>
                    <p className="mt-3.5">
                        Доставка осуществляется по согласованию с покупателем, за день сообщаем время доставки.
                    </p>
                    <div className="mt-5">
                        <div className="flex justify-between items-center">
                            <p><b>Подъем на этаж</b> <br/> от 100 руб.</p>
                            <div>
                                <label className="flex gap-x-2.5 items-center cursor-pointer">
                                    <span className="w-5 h-5 relative border border-dark rounded-[5px]">
                                        <input
                                            className="absolute left-0 top-0 w-full h-full appearance-none cursor-pointer" type="checkbox"
                                            checked={isLift}
                                            onChange={handleLiftChange}
                                        />
                                        <div className={`${isLift ? 'flex' : 'hidden'} w-full h-full justify-center items-center bg-dark`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"
                                                 viewBox="0 0 12 14" fill="none">
                                              <path
                                                  d="M1 6.53846L5.24782 12.3024C5.47623 12.6124 5.95454 12.5587 6.10857 12.2058L11 1"
                                                  stroke="#F2F2F1" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </span>
                                    <span>Да</span>
                                </label>
                                <label className="flex gap-x-2.5 items-center cursor-pointer mt-3">
                                    <span className="w-5 h-5 relative border border-dark rounded-[5px]">
                                        <input
                                            className="absolute left-0 top-0 w-full h-full appearance-none cursor-pointer" type="checkbox"
                                            checked={!isLift}
                                            onChange={handleLiftChange}
                                        />
                                        <div className={`${!isLift ? 'flex' : 'hidden'} w-full h-full justify-center items-center bg-dark`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"
                                                 viewBox="0 0 12 14" fill="none">
                                              <path
                                                  d="M1 6.53846L5.24782 12.3024C5.47623 12.6124 5.95454 12.5587 6.10857 12.2058L11 1"
                                                  stroke="#F2F2F1" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </span>
                                    <span>Нет</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <p><b>Установка мебели</b> <br/> от 500 руб.</p>
                            <div>
                                <label className="flex gap-x-2.5 items-center cursor-pointer">
                                    <span className="w-5 h-5 relative border border-dark rounded-[5px]">
                                        <input
                                            className="absolute left-0 top-0 w-full h-full appearance-none cursor-pointer" type="checkbox"
                                            checked={isSetup}
                                            onChange={handleSetupChange}
                                        />
                                        <div className={`${isSetup ? 'flex' : 'hidden'} w-full h-full justify-center items-center bg-dark`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"
                                                 viewBox="0 0 12 14" fill="none">
                                              <path
                                                  d="M1 6.53846L5.24782 12.3024C5.47623 12.6124 5.95454 12.5587 6.10857 12.2058L11 1"
                                                  stroke="#F2F2F1" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </span>
                                        <span>Да</span>
                                    </label>
                                <label className="flex gap-x-2.5 items-center cursor-pointer mt-3">
                                    <span className="w-5 h-5 relative border border-dark rounded-[5px]">
                                        <input
                                            className="absolute left-0 top-0 w-full h-full appearance-none cursor-pointer" type="checkbox"
                                            checked={!isSetup}
                                            onChange={handleSetupChange}
                                        />
                                        <div className={`${!isSetup ? 'flex' : 'hidden'} w-full h-full justify-center items-center bg-dark`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"
                                                 viewBox="0 0 12 14" fill="none">
                                              <path
                                                  d="M1 6.53846L5.24782 12.3024C5.47623 12.6124 5.95454 12.5587 6.10857 12.2058L11 1"
                                                  stroke="#F2F2F1" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </span>
                                    <span>Нет</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="mt-5 font-light">Цены уточняйте у менеджера*</p>
                </div>
            </div>




        </div>
    );
};

export default OrderDelivery;