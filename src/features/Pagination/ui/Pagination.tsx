'use client'
import {FC, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface PaginationProps {
    pageCount: number | undefined;
}

const Pagination: FC<PaginationProps> = ({ pageCount }) => {
    const urlParams = useSearchParams();
    const [curPage, setCurPage] = useState(Number(urlParams.get('page')) || 1);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    function setPage(page: number) {
        if (!pageCount || page < 1 || page > pageCount) {
            return;
        }
        setCurPage(page);
        window.scrollTo(0, 0);

        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(pathname + '?' + params.toString());
    }

    function nextPage() {
        if (pageCount && curPage < pageCount) {
            setPage(curPage + 1);
        }
    }

    return (
        <div className="flex flex-col gap-y-7 items-center mt-7">
            <div
                onClick={nextPage}
                className={`cursor-pointer px-[88px] py-[15px] text-center rounded text-fon bg-dark 
                    ${curPage >= (pageCount || 1) ? 'hidden' : 'block'} hover:bg-black`}
            >
                Смотреть еще
            </div>

            <ul className="flex font-roboto border border-dark rounded w-fit bg-fon cursor-pointer flex-wrap gap-y-2.5">
                {
                    curPage > 5 &&
                    <>
                        <li
                            key={0}
                            className={`flex justify-center items-center w-10 border-r border-dark min-h-[40px]`}
                            onClick={() => setPage(1)}
                        >
                            {1}
                        </li>
                        <li
                            key={1}
                            className={`flex justify-center items-center w-10 border-r border-dark min-h-[40px]`}
                        >
                            ...
                        </li>
                    </>
                }
                {
                    [...new Array(pageCount)].map((el, index) => {
                            if (curPage > 5 && (index < (curPage -2) || index > curPage + 1)) {
                                return;
                            }

                            if (curPage <= 5 && index > 5) return;

                            return <li
                                key={index}
                                className={`flex justify-center items-center w-10 border-r min-h-[40px] border-dark 
                                    ${curPage === (index + 1) ? 'bg-dark text-fon' : ''}`}
                                onClick={() => setPage(index + 1)}
                            >
                                {index + 1}
                            </li>
                        }
                    )
                }
                <li onClick={nextPage} className={`flex justify-center items-center w-10 ${curPage >= (pageCount || 1) ? 'hidden' : 'block'} min-h-[40px]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"
                         fill="none">
                        <path
                            d="M1.48386 14.6667L10.4071 8.08052C10.4613 8.04055 10.4613 7.95958 10.4071 7.91961L1.48386 1.3334"
                            stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;