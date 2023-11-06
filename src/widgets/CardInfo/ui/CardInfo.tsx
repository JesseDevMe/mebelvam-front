'use client'
import {FC, useEffect, useRef, useState} from "react";
import {attr, Furniture, variant} from "@/entities/Furniture";
import {MySelect} from "@/shared/MySelect";
import {addToFavorites, deleteFromFavorites, getFavorites, routesSyncFavorites} from "@/shared/Utils";
import {routesUpdateFavorites} from "@/shared/Utils/RouteHandlers";
import {CardAddCart} from "@/features/CardAddCart";

interface CardInfoProps {
    furniture: Furniture;
}

const CardInfo: FC<CardInfoProps> = ({ furniture }) => {
    const [curVariant, setCurVariant] =
        useState(furniture.variants[0]);
    const [curAttr, setCurAttr] =
        useState(curVariant.attributes[0]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);


    useEffect(() => {
        const favoritesId = getFavorites();
        setIsFavorite(favoritesId.includes(furniture.id));
    }, []);

    function variantChangeHandler(value: variant) {
        setCurVariant(value);
        setCurAttr(value.attributes[0]);
    }

    function attrChangeHandler(value: attr) {
        setCurAttr(value);
    }

    function favoriteToggle(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) {
            setIsFavorite(false);
            deleteFromFavorites(furniture.id);

            const token = localStorage.getItem('token');
            if (token) {
                const favorites = getFavorites();
                routesUpdateFavorites(favorites, token)
                    .catch();
            }
        } else {
            setIsFavorite(true);
            addToFavorites(furniture.id);

            const token = localStorage.getItem('token');
            if (token) {
                const favorites = getFavorites();
                routesUpdateFavorites(favorites, token)
                    .catch();
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-12 lg:justify-between">
            <div className="flex flex-col gap-y-7">
                <div className="flex justify-between items-center">
                    <h1 className="font-montserrat text-base font-semibold md:text-xl">{furniture.name}</h1>
                    <div className="cursor-pointer" onClick={favoriteToggle}>
                        <svg className="p-1 md:p-0.5" xmlns="http://www.w3.org/2000/svg" width="32" height="29" viewBox="0 0 32 29"
                             fill={`${isFavorite ? '#A50B34' : 'none'}`}>
                            <path
                                d="M3.53502 16.128L3.53421 16.1272C1.94546 14.4997 1.03369 12.2942 1.00091 9.97905C0.968142 7.66383 1.81713 5.43163 3.35961 3.75691C4.90129 2.08305 7.01283 1.09868 9.24241 1.00448C11.3428 0.915741 13.5312 2.16451 15.3236 3.81507C15.7065 4.16758 16.2956 4.16758 16.6784 3.81507C18.4711 2.16429 20.6574 0.915749 22.7576 1.00448C24.9872 1.09868 27.0987 2.08305 28.6404 3.75691C30.1829 5.43163 31.0319 7.66383 30.9991 9.97905C30.9663 12.2942 30.0545 14.4997 28.4658 16.1272L28.465 16.128L17.5448 27.3406C17.1304 27.7661 16.5742 28 16 28C15.4258 28 14.8696 27.7661 14.4553 27.3407C14.4552 27.3407 14.4552 27.3407 14.4552 27.3406L3.53502 16.128Z"
                                stroke={`${isFavorite ? '#A50B34' : '#292A2D'}`} strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <p className="font-montserrat text-xl font-semibold lg:text-3xl">
                    {curAttr.old_price && <span className="line-through font-roboto text-sm font-normal mr-3.5">{curAttr.old_price} руб.</span>}
                    <span className={curAttr.old_price ? 'text-accent' : ''}>
                        <span>{curAttr.price}</span>
                        <span className="font-montserrat font-normal text-sm md:text-base md:font-semibold lg:text-xl"> руб.</span>
                    </span>
                </p>
                <div className="flex flex-col flex-wrap min-[500px]:flex-row lg:flex-col gap-y-4 gap-x-8">
                    <div className="flex gap-x-5 items-center">
                        <span className="font-bold">Цвет:</span>
                        <MySelect
                            options={
                                furniture.variants.map((variant) => {
                                    let isSale = false;
                                    for (const attr of variant.attributes) {
                                        if (attr.old_price) {
                                            isSale = true;
                                            break;
                                        }
                                    }

                                    return {
                                        name: variant.color,
                                        isSale: isSale,
                                        value: variant,
                                    }
                                })
                            }
                            changeHandler={variantChangeHandler}
                        />
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <span className="font-bold">Размер:</span>
                        <MySelect
                            key={curVariant.color}
                            options={
                                curVariant.attributes.map((attr) => {
                                    return {
                                        name: attr.width + 'x' + attr.height + (attr.depth && 'x' + attr.depth),
                                        isSale: !!attr.old_price,
                                        value: attr,
                                    }
                                })
                            }
                            changeHandler={attrChangeHandler}
                        />
                    </div>
                </div>
                <div className="">
                    {(furniture.materials && furniture.materials.length > 0 ) &&
                        <p><span className="font-bold">Материал: </span>{furniture.materials.join('/')}</p>}

                    {furniture.manufacturer &&
                        <p className="mt-2.5"><span className="font-bold">Производитель: </span>{furniture.manufacturer}</p>
                    }
                </div>
            </div>
            <CardAddCart furnitureId={furniture.id} curVariant={curVariant} curAttr={curAttr}/>
        </div>
    );
};

export default CardInfo;