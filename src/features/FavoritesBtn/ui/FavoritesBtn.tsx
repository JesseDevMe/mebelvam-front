'use client'
import {FC, useEffect, useState} from "react";
import {addToFavorites, deleteFromFavorites, getFavorites, routesSyncFavorites} from "@/shared/Utils";
import {routesUpdateFavorites} from "@/shared/Utils/RouteHandlers";
import useUserStore from "@/entities/User/store/useUserStore";

interface FavoritesBtnProps {
    id : number;
}

const FavoritesBtn: FC<FavoritesBtnProps> = ({ id }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    function toggleHandler(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (isActive) {
            setIsActive(false);
            deleteFromFavorites(id);

            const token = localStorage.getItem('token');
            if (token) {
                const favorites = getFavorites();
                routesUpdateFavorites(favorites, token)
                    .then()
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    })
            }
        } else {
            setIsActive(true);
            addToFavorites(id);

            const token = localStorage.getItem('token');
            if (token) {
                const favorites = getFavorites();
                routesUpdateFavorites(favorites, token)
                    .then()
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    });
            }
        }
    }


    useEffect(() => {
        const favoritesId = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsActive(favoritesId.includes(id));
    }, []);

    return (
        <div onClick={toggleHandler} className="absolute top-0 right-0 z-[9] p-2.5 bg-[rgba(253,253,253,0.80)] rounded-bl">
            <svg className="md:w-6 md:h-[22px]" xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 24 22" fill={`${isActive ? '#A50B34' : 'none'}`}>
                <path d="M2.47416 12.4176L2.47375 12.4171C1.23613 11.1348 0.526229 9.3974 0.500712 7.57405C0.475195 5.75069 1.1362 3.99231 2.33774 2.67277C3.53872 1.35383 5.18396 0.57787 6.92149 0.503618C8.59401 0.432145 10.2977 1.4331 11.66 2.70201C11.852 2.88084 12.1496 2.88084 12.3416 2.70201C13.704 1.43299 15.4061 0.432149 17.0785 0.503618C18.816 0.57787 20.4613 1.35383 21.6623 2.67277C22.8638 3.99231 23.5248 5.75069 23.4993 7.57405C23.4738 9.3974 22.7639 11.1348 21.5262 12.4171L21.5258 12.4176L13.3357 20.9237C12.9781 21.2951 12.4972 21.5 12 21.5C11.5028 21.5 11.0219 21.2951 10.6643 20.9237L2.47416 12.4176Z" stroke={`${isActive ? '#A50B34' : '#292A2D'}`} strokeLinejoin="round"/>
            </svg>
        </div>
    );
};

export default FavoritesBtn;