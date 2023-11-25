import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import home from "../../../../public/NavMobile/home.svg";
import catalog from "../../../../public/NavMobile/catalog.svg";
import favorites from "../../../../public/NavMobile/favorites.svg";
import {HeaderCartBtn} from "@/features/HeaderCartBtn";
import {AccountLink} from "@/features/AccountLink";


interface NavBarMProps {

}

const NavBarM: FC<NavBarMProps> = ({}) => {

    return (
        <div className="fixed md:hidden bottom-0 left-0 w-full shadow-[0px_-5px_30px_0px_rgba(185,185,185,0.25)] bg-fon z-50">
            <div
                className="max-w-[1520px] h-12 min-[390px]:h-14 pt-2 pb-1.5 px-3.5 flex items-center"
            >
                <nav className="grid grid-cols-5 grow">
                    <Link href='/' className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={home} alt=''/>
                        <div className="hidden min-[390px]:block">Главная</div>
                    </Link>

                    <Link href={'/catalog'} className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={catalog} alt=''/>
                        <div className="hidden min-[390px]:block">Каталог</div>
                    </Link>

                    <AccountLink isMobile={true}/>

                    <Link href="/favorites" className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={favorites} alt=''/>
                        <div className="hidden min-[390px]:block">Избранное</div>
                    </Link>

                    <HeaderCartBtn isMobile={true}/>
                </nav>
            </div>
        </div>
    );
};

export default NavBarM;