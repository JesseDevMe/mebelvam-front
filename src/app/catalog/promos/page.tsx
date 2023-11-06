'use client'
import {FC, useEffect, useState} from "react";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {PromoCard, Promos} from "@/entities/Promo";
import {Pagination} from "@/features/Pagination";
import {useSearchParams} from "next/navigation";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const [promos, setPromos] = useState<Promos>();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');


    useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetch(`/api/promos${pageParam ? '?page=' + pageParam : ''}`)
            .then(res => res.json())
            .then((data) => {
                setPromos(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));

    }, [pageParam])

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20">
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
        </div>
    );
};

export default Page;