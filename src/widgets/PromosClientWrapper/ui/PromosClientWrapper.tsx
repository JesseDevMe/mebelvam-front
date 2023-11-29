'use client'
import {FC, useEffect, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {PromoCard, Promos} from "@/entities/Promo";
import {Pagination} from "@/features/Pagination";
import {FurnitureCardSkeleton} from "@/entities/FurnitureCard";
import {useSearchParams} from "next/navigation";
import {CatalogRouter} from "@/shared/CatalogRouter";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PromosClientWrapperProps {

}

const PromosClientWrapper: FC<PromosClientWrapperProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const [promos, setPromos] = useState<Promos>();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');

    useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetch(`/api/promos${pageParam ? '?page=' + pageParam : ''}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    setFetchStatus(FetchStatus.FAILED);
                    throw new Error();
                }
            })
            .then((data) => {
                setPromos(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [pageParam])

    return (
        <>
            <div className="lg:mt-10 lg:mb-[55px]">
                <CatalogRouter
                    routes={[
                        {
                            name: 'Акции',
                            path: `/promos`
                        }
                    ]}
                />
            </div>
            { fetchStatus === FetchStatus.DONE && promos &&
                <>
                    <FurnitureGrid>
                        {
                            promos.data.map((promo) =>
                                <PromoCard key={promo.id + promo.size} id={promo.id} name={promo.name} price={promo.price}
                                           old_price={promo.old_price} size={promo.size} color={promo.color}
                                           imagesUrl={promo.imagesUrl} variantId={promo.variantId} attrId={promo.attrId}/>
                            )
                        }
                    </FurnitureGrid>
                    <Pagination pageCount={promos.meta.pagination.pageCount}/>
                </>
            }

            { fetchStatus === FetchStatus.FAILED &&
                'Не получилось загрузить акционные товары. Мы уже решаем проблему. Пожалуйста, попробуйте позже.'
            }

            { fetchStatus === FetchStatus.LOADING &&
                <FurnitureGrid>
                    {
                        [...new Array(20)].map((_, index) =>
                            <FurnitureCardSkeleton key={index}/>
                        )
                    }
                </FurnitureGrid>
            }
        </>
    );
};

export default PromosClientWrapper;