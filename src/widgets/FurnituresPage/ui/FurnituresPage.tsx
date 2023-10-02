import {FC, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard} from "@/entities/FurnitureCard";
import {FurnitureMini, Furnitures} from "@/entities/Furniture";

interface FurnituresPageProps {
    furnitures: Furnitures;
}

const FurnituresPage: FC<FurnituresPageProps> = ({ furnitures }) => {

    function nextPage() {

    }

    return (
        <div>
            <FurnitureGrid>
                {
                    furnitures.data.map((furniture, index) =>
                        <FurnitureCard
                            key={index}
                            id={furniture.id}
                            name={furniture.name}
                            manufacturer={furniture.manufacturer}
                            materials={furniture.materials?.join('/')}
                            size={furniture.size}
                            price={furniture.price}
                            imagesUrl={furniture.imagesUrl}
                        />
                    )
                }
            </FurnitureGrid>

            {/*<div className="flex flex-col gap-y-7 items-center mt-7">*/}
            {/*    <div*/}
            {/*        onClick={nextPage}*/}
            {/*        className={`cursor-pointer px-[88px] py-[15px] rounded text-fon ${curPage >= furnitures.meta.pagination.pageCount ? 'bg-gray-700' : 'bg-dark'}`}*/}
            {/*    >*/}
            {/*        Смотреть еще*/}
            {/*    </div>*/}

            {/*    <ul className="flex font-roboto h-10 border border-dark rounded w-fit bg-fon ">*/}
            {/*        {*/}
            {/*            [...new Array(furnitures.meta.pagination.pageCount)].map((el, index) =>*/}
            {/*                <li*/}
            {/*                    key={index}*/}
            {/*                    className={`flex justify-center items-center w-10 border-r border-dark ${curPage === (index + 1) ? 'bg-dark text-fon' : ''}`}*/}
            {/*                    onClick={() => setCurPage(index + 1)}*/}
            {/*                >*/}
            {/*                    {index + 1}*/}
            {/*                </li>*/}
            {/*            )*/}
            {/*        }*/}
            {/*        <li onClick={nextPage} className="flex justify-center items-center w-10">*/}
            {/*            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">*/}
            {/*                <path d="M1.48386 14.6667L10.4071 8.08052C10.4613 8.04055 10.4613 7.95958 10.4071 7.91961L1.48386 1.3334" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>*/}
            {/*            </svg>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
};

export default FurnituresPage;