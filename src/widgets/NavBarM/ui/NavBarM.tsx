import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import cart from "../../../../public/NavMobile/cart.svg";
import home from "../../../../public/NavMobile/home.svg";
import catalog from "../../../../public/NavMobile/catalog.svg";
import favorites from "../../../../public/NavMobile/favorites.svg";
import {LogInButton} from "@/features/LogInButton";
import {HeaderCartBtn} from "@/features/HeaderCartBtn";


interface NavBarMProps {

}

const NavBarM: FC<NavBarMProps> = ({}) => {

    return (
        <div className="fixed md:hidden bottom-0 left-0 w-full shadow-[0px_-5px_30px_0px_rgba(185,185,185,0.25)] bg-fon z-50">
            <div
                className="max-w-[1520px] w-full pt-2 pb-1 px-3.5"
            >
                <nav className="flex justify-around items-center">
                    <Link href='/' className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={home} width={24} height={24} alt=''/>
                        <div>Главная</div>
                    </Link>

                    <Link href={'/catalog'} className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={catalog} width={24} height={24} alt=''/>
                        <div>Каталог</div>
                    </Link>

                    <LogInButton>
                        <div className="cursor-pointer flex flex-col gap-1 items-center">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.5" cy="6" r="4.25" stroke="#292A2D" strokeWidth="1.5"/>
                                <path d="M22.5 23V20.9737C22.5 20.3288 22.396 19.6881 22.1921 19.0763L21.8675 18.1026C21.0509 15.6526 18.758 14 16.1754 14H12.5H8.82456C6.24197 14 3.94914 15.6526 3.13246 18.1026L2.8079 19.0763C2.60397 19.6881 2.5 20.3288 2.5 20.9737V23" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <div>Вход</div>
                        </div>
                    </LogInButton>

                    <Link href="/favorites" className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={favorites} width={24} height={24} alt=''/>
                        <div>Избранное</div>
                    </Link>

                    <HeaderCartBtn isMobile={true}/>
                </nav>
            </div>
        </div>
    );
};

export default NavBarM;