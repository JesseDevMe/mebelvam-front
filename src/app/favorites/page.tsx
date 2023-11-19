'use client'
import {FC, useEffect, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard, FurnitureCardSkeleton} from "@/entities/FurnitureCard";
import {FurnitureMini} from "@/entities/Furniture";
import Link from "next/link";
import {LogInButton} from "@/features/LogInButton";
import {getFavorites} from "@/shared/Utils";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const [furnitures, setFurnitures] = useState<FurnitureMini[]>([]);

    useEffect(() => {
        const furnituresId: number[] = getFavorites();

        if (furnituresId.length === 0) {
            setFurnitures([]);
            setFetchStatus(FetchStatus.DONE);
            return;
        }

        fetch(`/api/furniturebyid?id=${furnituresId.join(',')}`)
            .then(res => res.json())
            .then((data) => {
                setFetchStatus(FetchStatus.DONE);
                setFurnitures(data);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [])

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto text-base">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">Избранное</h1>
            {
                fetchStatus === FetchStatus.LOADING &&
                <FurnitureGrid>
                    {
                        [...new Array(20)].map((_, index) =>
                            <FurnitureCardSkeleton key={index}/>
                        )
                    }
                </FurnitureGrid>
            }

            {
                fetchStatus === FetchStatus.FAILED && <div>Ошибка загрузки избранных товаров</div>
            }

            {
                fetchStatus === FetchStatus.DONE && furnitures.length > 0 &&
                <FurnitureGrid>
                    {
                        furnitures.map((furniture) =>
                            <FurnitureCard
                                key={furniture.id}
                                id={furniture.id}
                                name={furniture.name}
                                price={furniture.price}
                                colors={furniture.colors}
                                sizes={furniture.sizes}
                                imagesUrl={furniture.imagesUrl}
                                firstAttrId={furniture.firstAttrId}
                                firstVariantId={furniture.firstVariantId}
                            />
                        )
                    }
                </FurnitureGrid>
            }

            {
                fetchStatus === FetchStatus.DONE && furnitures.length === 0 &&
                <div className="text-center border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] flex flex-col items-center gap-y-5 py-[30px] px-5 lg:gap-y-7">
                    <svg className="lg:w-[110px] lg:h-[102px]" xmlns="http://www.w3.org/2000/svg" width="80" height="72" viewBox="0 0 80 72" fill="none">
                        <path d="M9.2544 40.0351L9.25237 40.033C5.33417 35.9965 3.08316 30.5235 3.00226 24.7755C2.92135 19.0274 5.01747 13.4879 8.82179 9.334C12.6237 5.18267 17.8278 2.7444 23.3191 2.51108C28.4864 2.29153 33.8793 5.38228 38.3039 9.4798C39.2624 10.3674 40.7427 10.3674 41.7012 9.4798C46.1264 5.38173 51.5141 2.29155 56.6809 2.51108C62.1722 2.7444 67.3763 5.18267 71.1782 9.334C74.9825 13.4879 77.0787 19.0274 76.9977 24.7755C76.9168 30.5235 74.6658 35.9965 70.7476 40.033L70.7456 40.0351L43.7864 67.8732C43.7863 67.8733 43.7863 67.8733 43.7863 67.8734C42.7678 68.9248 41.4042 69.5 40 69.5C38.5958 69.5 37.2322 68.9248 36.2137 67.8734C36.2137 67.8733 36.2137 67.8733 36.2136 67.8732L9.2544 40.0351Z" stroke="#292A2D" strokeWidth="5" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-base font-montserrat font-semibold md:text-xl lg:text-2xl">В избранном пусто</p>
                    <div>
                        Добавляйте товары с помощью
                        <svg className="inline-block ml-2.5" xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 80 72" fill="none">
                            <path d="M9.2544 40.0351L9.25237 40.033C5.33417 35.9965 3.08316 30.5235 3.00226 24.7755C2.92135 19.0274 5.01747 13.4879 8.82179 9.334C12.6237 5.18267 17.8278 2.7444 23.3191 2.51108C28.4864 2.29153 33.8793 5.38228 38.3039 9.4798C39.2624 10.3674 40.7427 10.3674 41.7012 9.4798C46.1264 5.38173 51.5141 2.29155 56.6809 2.51108C62.1722 2.7444 67.3763 5.18267 71.1782 9.334C74.9825 13.4879 77.0787 19.0274 76.9977 24.7755C76.9168 30.5235 74.6658 35.9965 70.7476 40.033L70.7456 40.0351L43.7864 67.8732C43.7863 67.8733 43.7863 67.8733 43.7863 67.8734C42.7678 68.9248 41.4042 69.5 40 69.5C38.5958 69.5 37.2322 68.9248 36.2137 67.8734C36.2137 67.8733 36.2137 67.8733 36.2136 67.8732L9.2544 40.0351Z" stroke="#292A2D" strokeWidth="5" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        Если в избранном были товары – <LogInButton><b className="underline">войдите</b></LogInButton>, чтобы посмотреть список.
                    </div>
                    <Link className="bg-dark py-4 w-full max-w-[360px] rounded text-light font-montserrat text-base font-semibold md:mt-3" href='/catalog'>
                        Каталог товаров
                    </Link>
                </div>
            }

        </div>
    );
};

export default Page;