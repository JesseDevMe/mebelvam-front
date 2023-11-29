'use client'
import {FC} from "react";

interface CardDetailsProps {
 sizes: string[];
 colors: string[];
 isModular?: boolean;
}

const CardDetails: FC<CardDetailsProps> = ({ sizes, colors, isModular = false }) => {

    function clickHandler(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div
            onClick={e => clickHandler(e)}
            className="relative flex gap-x-2.5 items-center font-light mt-3.5 group"
        >
            <span>Подробности</span>
            <svg className="transition duration-300 group-hover:rotate-180 group-active:rotate-180" xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M5.24443 7.15822C5.12479 7.32573 4.87584 7.32574 4.75619 7.15824L0.338863 0.974379C0.197026 0.775819 0.338963 0.5 0.582978 0.5L9.41706 0.5C9.66107 0.5 9.80301 0.775803 9.66119 0.974364L5.24443 7.15822Z" fill="#313131"/>
            </svg>

            <div className={`hidden z-[15] absolute left-0 top-full w-[100%] border border-[#DADADA] rounded bg-fon p-5 shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.1)] group-hover:block group-active:block`}>
                { !isModular &&
                    <ul className="font-light list-disc">
                        <span className="block font-normal mb-2.5">Размеры:</span>
                        {
                            sizes.map(size => {
                                    if (size.length > 0) {
                                        return <li key={size} className="ml-6">{size}</li>
                                    }
                                }
                            )
                        }
                    </ul>
                }

                <ul className="font-light list-disc mt-3.5">
                    <span className="block font-normal mb-2.5">Цвета:</span>
                    {
                        colors.map(color =>
                            <li key={color} className="ml-6">{color}</li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default CardDetails;