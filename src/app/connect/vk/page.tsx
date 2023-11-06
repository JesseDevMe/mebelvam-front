'use client'
import {FC, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getFavorites, routesSyncFavorites} from "@/shared/Utils";

enum STATUS {
    PROCESS,
    SUCCEED,
    FAILED
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const [status, setStatus] = useState<STATUS>(STATUS.PROCESS);
    const searchParams = useSearchParams();
    const token = searchParams.toString().slice(searchParams.toString().indexOf('=') + 1);

    useEffect(() => {
        fetch('/api/connect/vk?access_token=' + token)
            .then(res => res.json())
            .catch(error => setStatus(STATUS.FAILED))
            .then(data => {
                console.log(data)
                if (data.error) {
                    return setStatus(STATUS.FAILED);
                }

                if (data?.jwt) {
                    localStorage.setItem('token', data.jwt);
                    const favorites = getFavorites();

                    routesSyncFavorites(favorites, data.jwt)
                        .catch(error => console.log(error))
                        .then(data => {
                            localStorage.setItem('favorites', JSON.stringify(data));
                        })
                    return setStatus(STATUS.SUCCEED);
                }
            })
    }, [])

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto text-base">
            {status === STATUS.PROCESS &&
                <div>Идет проверка... 🥱</div>
            }

            {status === STATUS.SUCCEED &&
                <div>Все отлично!</div>
            }

            {status === STATUS.FAILED &&
                <div>К сожалению, сервис не смог предоставить нужные данные 😥. Пожалуйста, выберите другой способ входа.</div>
            }
        </div>
    );
};

export default Page;