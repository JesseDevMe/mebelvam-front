'use client'
import {FC, useEffect, useState} from "react";
import {CartCardSkeleton} from "@/entities/CartCard";
import Image from "next/image";
import cart from "../../../../public/Pages/Cart/cart.svg";
import {LogInButton} from "@/features/LogInButton";
import Link from "next/link";
import {OrderCard} from "@/entities/OrderCard";
import {FormProvider, useForm} from "react-hook-form";
import {PersonalData} from "@/widgets/PersonalData";
import {OrderDelivery} from "@/widgets/OrderDelivery";
import {Payment} from "@/widgets/Payment";
import {OrderTotalInfo} from "@/widgets/OrderTotalInfo";
import useCartStore from "@/entities/Cart/store/useCartStore";
import useOrderStore from "@/entities/Order/store/useOrderStore";
import {CartFurniture, CartItem} from "@/entities/Cart";
import {getCart} from "@/shared/Utils";
import useUserStore from "@/entities/User/store/useUserStore";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface OrderClientWrapperProps {

}

const OrderClientWrapper: FC<OrderClientWrapperProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const cartFurnitures = useCartStore(state => state.furnitures);
    const orderFurnitures = useOrderStore(state => state.furnitures);
    const setOrderFur = useOrderStore(state => state.setFurnitures);
    const formMethods = useForm();
    const isAuth = useUserStore(state => state.isAuth);

    useEffect(() => {
        if (cartFurnitures.length > 0) {
            setOrderFur(cartFurnitures);
            setFetchStatus(FetchStatus.DONE);
            return;
        }

        const cart: CartItem[] = getCart();

        if (cart.length === 0) {
            setOrderFur([]);
            setFetchStatus(FetchStatus.DONE);
            return;
        }

        fetch('/api/build-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart),
        })
            .then(res => {
                if (!res.ok) {
                    setFetchStatus(FetchStatus.FAILED);
                    throw new Error();
                } else return res.json()
            })
            .then((data: CartFurniture[]) => {
                setFetchStatus(FetchStatus.DONE);
                setOrderFur(data);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [cartFurnitures, setOrderFur])

    return (
        <>
            <div className="lg:grow">
                <div className="border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-5">
                    {
                        fetchStatus === FetchStatus.LOADING &&
                        <div>
                            {[...new Array(4)].map((_, index) =>
                                <CartCardSkeleton key={index}/>
                            )
                            }
                        </div>
                    }

                    {
                        fetchStatus === FetchStatus.FAILED &&
                        <div>
                            Не удалось загрузить страницу. Пожалуйста, попробуйте снова чуть позже.
                        </div>
                    }

                    {
                        fetchStatus === FetchStatus.DONE && orderFurnitures.length === 0 &&
                        <div className="flex flex-col gap-y-5 items-center text-center md:py-[30px] lg:py-[50px]">
                            <Image className="lg:w-[110px] lg:h-[102px]" src={cart} alt="Корзина"/>
                            <p className="font-montserrat text-base font-semibold md:text-xl lg:text-2xl">
                                В корзине пусто
                            </p>
                            <p>Зайдите в каталог, чтобы выбрать товары или найдите нужное в поиске</p>
                            {!isAuth &&
                                <div>Если в корзине были товары – <LogInButton><b
                                    className="underline">войдите</b></LogInButton>, чтобы посмотреть список.
                                </div>
                            }

                            <Link
                                className="bg-dark py-4 w-full max-w-[360px] rounded text-light font-montserrat text-base font-semibold md:mt-3"
                                href='/catalog'>
                                Каталог товаров
                            </Link>
                        </div>
                    }

                    {
                        fetchStatus === FetchStatus.DONE && orderFurnitures.length > 0 &&
                        <div>
                            {
                                orderFurnitures.map(furniture =>
                                    <OrderCard
                                        key={furniture.id + furniture.attrId}
                                        count={furniture.count}
                                        id={furniture.id}
                                        name={furniture.name}
                                        imageUrl={furniture.imageUrl}
                                        color={furniture.color}
                                        size={furniture.size}
                                        price={furniture.price}
                                        oldPrice={furniture.oldPrice}
                                        variantId={furniture.variantId}
                                        attrId={furniture.attrId}
                                    />
                                )
                            }
                        </div>
                    }
                </div>

                { fetchStatus === FetchStatus.DONE && orderFurnitures.length > 0 &&
                    <>
                        <FormProvider {...formMethods}>
                            <PersonalData/>
                        </FormProvider>

                        <OrderDelivery/>

                        <Payment/>
                    </>
                }
            </div>
            {fetchStatus === FetchStatus.LOADING &&
                <div>
                    <div className="md:sticky md:top-16">
                        <div className="h-[250px] rounded bg-gray-200 shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-[30px] lg:min-w-[350px] animate-pulse"></div>
                    </div>
                </div>
            }
            {fetchStatus === FetchStatus.DONE && orderFurnitures.length > 0 &&
                <div>
                    <div className="md:sticky md:top-20">
                        <FormProvider {...formMethods}>
                            <OrderTotalInfo/>
                        </FormProvider>
                    </div>
                </div>
            }
        </>
    );
};

export default OrderClientWrapper;