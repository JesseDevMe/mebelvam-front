'use client'
import {FC, useState} from "react";
import {Furniture} from "@/entities/Furniture";
import Link from "next/link";
import {ModulesGrid} from "@/widgets/ModulesGrid";
import {ModuleCard} from "@/entities/ModuleCard";

interface CardSwitchProps {
    furniture: Furniture;
}

const CardSwitch: FC<CardSwitchProps> = ({ furniture }) => {
    const [curSwitch, setCurSwitch] = useState(1);

    return (
        <div>
            <div className="flex justify-between gap-x-5 mb-5">
                <ul className="flex gap-x-7 md:text-base md:font-montserrat lg:text-xl h-fit">
                    <li
                        onClick={() => setCurSwitch(1)}
                        className={`cursor-pointer hover:text-accent py-0.5 px-[1px] ${curSwitch === 1 ? 'border-b-2 border-dark font-bold hover:text-dark' : ''}`}
                    >
                        Описание
                    </li>
                    { furniture.modules && furniture.modules.length > 0 &&
                        <li
                            onClick={() => setCurSwitch(2)}
                            className={`cursor-pointer hover:text-accent py-0.5 px-[1px] ${curSwitch === 2 ? 'border-b-2 border-dark font-bold hover:text-dark' : ''}`}
                            >
                            Модули
                        </li>
                    }
                </ul>
                {furniture.collectionId &&
                    <Link href={'/catalog/collections/' + furniture.collectionId}
                       className="text-end cursor-pointer font-montserrat font-semibold md:text-base lg:text-xl"
                    >
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
                <ModulesGrid>
                    {
                        furniture.modules?.map(module =>
                            <ModuleCard
                                key={module.id}
                                id={module.id}
                                name={module.name}
                                count={module.count}
                                imageUrl={module.imageUrl}
                            />
                        )
                    }
                </ModulesGrid>
            }
        </div>
    );
};

export default CardSwitch;