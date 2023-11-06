'use client'
import {FC, useState} from "react";
import {Furniture} from "@/entities/Furniture";
import Link from "next/link";

interface CardSwitchProps {
    furniture: Furniture;
}

const CardSwitch: FC<CardSwitchProps> = ({ furniture }) => {
    const [curSwitch, setCurSwitch] = useState(1);

    return (
        <div>
            <div className="flex justify-between">
                <ul className="flex gap-x-7 mb-5 md:text-base md:font-montserrat lg:text-xl">
                    <li
                        onClick={() => setCurSwitch(1)}
                        className={`cursor-pointer py-0.5 px-[1px] ${curSwitch === 1 ? 'border-b-2 border-dark font-bold' : ''}`}
                    >
                        Описание
                    </li>
                    <li
                        onClick={() => setCurSwitch(2)}
                        className={`cursor-pointer py-0.5 px-[1px] ${curSwitch === 2 ? 'border-b-2 border-dark font-bold' : ''}`}
                    >
                        Модули
                    </li>
                </ul>
                {furniture.collectionId &&
                    <Link href={'/catalog/collections/' + furniture.collectionId}
                       className="cursor-pointer py-0.5 font-montserrat font-semibold md:text-base lg:text-xl">
                    Посмотреть все модули коллекции
                </Link>
                }
            </div>
            { curSwitch === 1 &&
                <div className="whitespace-pre-line">
                    {furniture.description}
                </div>
            }

            { curSwitch === 2 &&
                <div>
                    Модули тут будут
                </div>
            }
        </div>
    );
};

export default CardSwitch;