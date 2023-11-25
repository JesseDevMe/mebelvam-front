'use client'
import {FC, useEffect, useRef, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard, FurnitureCardSkeleton} from "@/entities/FurnitureCard";
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    setFetchStatus(FetchStatus.FAILED);
                   throw new Error();
                }
            })
            .then((data) => {
                setFurnitures(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [urlParams, subcategoryId])



    return (
        <div>
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

            {furnitures && fetchStatus === FetchStatus.DONE && furnitures.data.length > 0 &&
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
                                    isModular={furniture.isModular}
                                />
                            )
                        }
                    </FurnitureGrid>
                    <Pagination pageCount={pageCount}/>
                </div>
            }

            {furnitures && fetchStatus === FetchStatus.DONE && furnitures.data.length === 0 &&
                <div className="lg:text-base mt-5">
                    По вашему запросу товаров сейчас нет.
                </div>
            }

            {
                fetchStatus === FetchStatus.FAILED &&
                <div>
                    Во время загрузки возникла ошибка.
                    Пожалуйста, попробуйте снова чуть позже. Мы уже заняты решением проблемы.
                </div>
            }
        </div>
    );
};

export default FurnituresPage;