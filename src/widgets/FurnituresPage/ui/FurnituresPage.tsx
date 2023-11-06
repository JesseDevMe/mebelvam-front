'use client'
import {FC, useEffect, useRef, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard} from "@/entities/FurnitureCard";
import {Furnitures} from "@/entities/Furniture";
import {useRouter, useSearchParams} from "next/navigation";
import {Pagination} from "@/features/Pagination";
import {Filters} from "../../Filters";
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface FurnituresPageProps {
    subcategoryId: number
}

const FurnituresPage: FC<FurnituresPageProps> = ({ subcategoryId }) => {
    const urlParams = useSearchParams();
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const [furnitures, setFurnitures] = useState<Furnitures | null>(null);
    const pageCount = furnitures?.meta.pagination.pageCount;

    useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetch(`/api/furniture?${urlParams.toString()}&subcategoryId=${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
                setFurnitures(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [urlParams, subcategoryId])



    return (
        <div>
            {
            fetchStatus === FetchStatus.LOADING && <div>Загрузка</div>
            }

            {furnitures && fetchStatus === FetchStatus.DONE &&
                <div>
                    <FurnitureGrid>
                        {furnitures &&
                            furnitures.data.map((furniture, index) =>
                                <FurnitureCard
                                    key={index}
                                    id={furniture.id}
                                    name={furniture.name}
                                    colors={furniture.colors}
                                    sizes={furniture.sizes}
                                    price={furniture.price}
                                    imagesUrl={furniture.imagesUrl}
                                    firstAttrId={furniture.firstAttrId}
                                    firstVariantId={furniture.firstVariantId}
                                />
                            )
                        }
                    </FurnitureGrid>
                    <Pagination pageCount={pageCount}/>
                </div>
                }

                {
                    fetchStatus === FetchStatus.FAILED && <div>Ошибка загрузки</div>
                }
        </div>
    );
};

export default FurnituresPage;