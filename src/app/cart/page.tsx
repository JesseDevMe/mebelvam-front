'use client'
import {FC, useEffect, useState} from "react";
import cart from '@/../public/Pages/Cart/cart.svg'
import Image from "next/image";
import Link from "next/link";
import {LogInButton} from "@/features/LogInButton";
import {getCart} from "@/shared/Utils";
import {CartFurniture, CartItem} from "@/entities/Cart";
import {CartCard, CartCardSkeleton} from "@/entities/CartCard";
import {CartTotalInfo} from "@/widgets/CartTotalInfo";
import useCartStore from "@/entities/Cart/store/useCartStore";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const furnitures = useCartStore(state => state.furnitures);
    const setFurnitures = useCartStore(state => state.setFurnitures);

    useEffect(() => {
        const cart: CartItem[] = getCart();

        if (cart.length === 0) {
            setFurnitures([]);
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
                    return setFetchStatus(FetchStatus.FAILED);
                } else return res.json()
            })
            .then((data: CartFurniture[]) => {
                setFetchStatus(FetchStatus.DONE);
                setFurnitures(data);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [])

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">Корзина</h1>
            <div className="flex flex-col gap-7 lg:flex-row">
                <div className="border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-5 lg:grow h-fit"
                >
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
                        fetchStatus === FetchStatus.FAILED && <div>Не удалось загрузить корзину</div>
                    }

                    {
                        fetchStatus === FetchStatus.DONE && furnitures.length === 0 &&
                        <div className="flex flex-col gap-y-5 items-center text-center">
                            <Image className="lg:w-[110px] lg:h-[102px]" src={cart} alt="Корзина"/>
                            <p className="font-montserrat text-base font-semibold md:text-xl lg:text-2xl">В корзине
                                пусто</p>
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
                        fetchStatus === FetchStatus.DONE && furnitures.length > 0 &&
                        <div >
                            {
                                furnitures.map(furniture =>
                                    <CartCard
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
                                        isModular={furniture.isModular}
                                    />
                                )
                            }
                        </div>
                    }
                </div>
                <div>
                    <div className="md:sticky md:top-16">
                        {fetchStatus === FetchStatus.LOADING &&
                            <div className="h-[250px] rounded bg-gray-200 shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-[30px] lg:min-w-[350px] animate-pulse"></div>
                        }
                        {fetchStatus === FetchStatus.DONE && furnitures.length > 0 &&
                            <CartTotalInfo/>
                        }
                        <div className="hidden font-montserrat text-base font-semibold text-center mt-7 lg:block">
                            <div className="border rounded bg-fon h-[70px] flex items-center justify-center mt-5">
                                <p className="max-w-[240px]">Бесплатная доставка от <br/> 7 000 руб.</p>
                            </div>
                            <div className="border rounded bg-fon h-[70px] flex items-center justify-center mt-5">
                                Оплата при получении
                            </div>
                            <div className="border rounded bg-fon h-[70px] flex items-center justify-center mt-5">
                                Эскиз кухни бесплатно
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;