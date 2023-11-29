'use client'
import {FC, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Furnitures} from "@/entities/Furniture";
import {Sort} from "@/features/Sort";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard, FurnitureCardSkeleton} from "@/entities/FurnitureCard";
import {Pagination} from "@/features/Pagination";

enum FetchStatus {
    NO_ACTION,
    LOADING,
    FAILED,
    DONE,
}

interface SearchClientWrapperProps {

}

const SearchClientWrapper: FC<SearchClientWrapperProps> = ({}) => {
    const router = useRouter();
    const urlParams = useSearchParams();
    const urlPath = usePathname();

    const qParam = urlParams.get('q') || '';
    const pageParam = urlParams.get('page') && `&page=${urlParams.get('page')}`;
    const sortParam = urlParams.get('sort') && `&sort=${urlParams.get('sort')}`;

    const [inputValue, setInputValue] = useState<string>(qParam);
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.NO_ACTION);

    const [furnitures, setFurnitures] = useState<Furnitures | null>(null);
    const pageCount = furnitures?.meta.pagination.pageCount;

    function searchHandler() {
        const newParams = new URLSearchParams(urlParams);
        newParams.set('q', inputValue);
        router.push(urlPath + '?' + newParams);
        if (inputValue.length === 0) {
            setFetchStatus(FetchStatus.NO_ACTION);
        }
    }

    useEffect(() => {
        if (qParam.length === 0) {
            setFetchStatus(FetchStatus.NO_ACTION);
            return;
        }

        setFetchStatus(FetchStatus.LOADING);
        fetch(`/api/furniture/search?q=${qParam}${pageParam ? pageParam : ''}${sortParam ? sortParam : ''}`)
            .then(res => {
                if (!res.ok) {
                    setFetchStatus(FetchStatus.FAILED);
                    throw new Error();
                } else {
                    return res.json();
                }
            })
            .then((data: Furnitures) => {
                setFetchStatus(FetchStatus.DONE);
                setFurnitures(data);
            })
            .catch(error => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [pageParam, sortParam, qParam]);

    return (
        <>
            <div className="overflow-hidden relative border border-dark pl-11 rounded mt-[30px] md:mt-[50px] md:max-w-[680px]">

                <svg className="absolute top-1/2 left-3 -translate-y-1/2" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 18 20" fill="none"><g opacity="0.5"><circle cx="7" cy="8" r="6" stroke="#292A2D" strokeWidth="2"></circle><path d="M11 13L16 18" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"></path></g></svg>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchHandler();
                    }}
                    className="flex justify-between gap-x-2.5"
                >
                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        className="text-base font-roboto outline-0 py-3 grow min-w-0" type="text"
                        placeholder="Искать по названию"
                    />
                    <button
                        disabled={fetchStatus === FetchStatus.LOADING}
                        type="submit"
                        className="bg-dark w-20 md:w-[100px] hover:bg-black text-light font-montserrat
                            lg:text-base font-semibold"
                    >
                        { fetchStatus === FetchStatus.LOADING
                            ? <>
                                <svg className="inline-block animate-spin h-5 w-5 text-white"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </>
                            : 'Найти'
                        }
                    </button>
                </form>
            </div>

            {fetchStatus === FetchStatus.DONE && furnitures &&
                <>
                    <div className="flex flex-col gap-y-8 mt-10 md:items-end md:flex-row md:justify-between">
                        <div>
                            <h2 className="font-montserrat font-semibold text-base lg:text-xl">Результаты поиска</h2>
                            <p className="mt-2.5">По запросу &quot;{qParam}&quot; найдено: {furnitures?.meta.pagination.total} ед. товара</p>
                        </div>
                        {furnitures.data.length > 0 && <Sort/>}
                    </div>

                    {furnitures.data.length === 0
                        ?
                        <div>

                        </div>
                        :
                        <div className="md:mt-10">
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
                </>

            }


            {
                fetchStatus === FetchStatus.LOADING &&
                <div className="mt-[100px]">
                    <FurnitureGrid>
                        {
                            [...new Array(20)].map((_, index) =>
                                <FurnitureCardSkeleton key={index}/>
                            )
                        }
                    </FurnitureGrid>
                </div>
            }

            {fetchStatus === FetchStatus.FAILED &&
                <p className="mt-1.5 text-red-500">При выполнении поискового запроса произошла ошибка. Пожалуйста, попробуйте еще раз.</p>
            }
        </>
    );
};

export default SearchClientWrapper;