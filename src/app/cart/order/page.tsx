'use client'
import {FC, useEffect, useState} from "react";
import cart from '@/../public/Pages/Cart/cart.svg'
import Image from "next/image";
import Link from "next/link";
import {LogInButton} from "@/features/LogInButton";
import {getCart} from "@/shared/Utils";
import {CartFurniture, CartItem} from "@/entities/Cart";
import useCartStore from "@/entities/Cart/store/useCartStore";
import useOrderStore from "@/entities/Order/store/useOrderStore";
import {OrderCard} from "@/entities/OrderCard";
import {OrderTotalInfo} from "@/widgets/OrderTotalInfo";
import {PersonalData} from "@/widgets/PersonalData";
import {FormProvider, useForm} from "react-hook-form";
import {OrderDelivery} from "@/widgets/OrderDelivery";
import {Payment} from "@/widgets/Payment";
import {CartCardSkeleton} from "@/entities/CartCard";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const cartFurnitures = useCartStore(state => state.furnitures);
    const orderFurnitures = useOrderStore(state => state.furnitures);
    const setOrderFur = useOrderStore(state => state.setFurnitures);
    const formMethods = useForm()

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
            .then(res => res.json())
            .then((data: CartFurniture[]) => {
                setFetchStatus(FetchStatus.DONE);
                setOrderFur(data);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [cartFurnitures])

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">
                Оформление заказа
            </h1>
            <div className="flex flex-col gap-7 lg:flex-row">
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
                            fetchStatus === FetchStatus.FAILED && <div>Не удалось загрузить страницу</div>
                        }

                        {
                            fetchStatus === FetchStatus.DONE && orderFurnitures.length === 0 &&
                            <div className="flex flex-col gap-y-5 items-center text-center">
                                <Image className="lg:w-[110px] lg:h-[102px]" src={cart} alt="Корзина"/>
                                <p className="font-montserrat text-base font-semibold md:text-xl lg:text-2xl">
                                    В корзине пусто
                                </p>
                                <p>Зайдите в каталог, чтобы выбрать товары или найдите нужное в поиске</p>
                                <div>Если в корзине были товары – <LogInButton><b
                                    className="underline">войдите</b></LogInButton>, чтобы посмотреть список.
                                </div>
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
                        <div className="md:sticky md:top-16">
                            <FormProvider {...formMethods}>
                                <OrderTotalInfo/>
                            </FormProvider>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Page;