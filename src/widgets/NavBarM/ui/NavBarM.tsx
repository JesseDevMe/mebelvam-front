import {FC} from "react";
import {links} from "./../model";
import Image from "next/image";
import Link from "next/link";
import cart from "../../../../public/NavMobile/cart.svg";


interface NavBarMProps {

}

const NavBarM: FC<NavBarMProps> = ({}) => {

    return (
        <div className="fixed md:hidden w-full bottom-0 left-0 pt-2 pb-1 px-3.5 shadow-[0px_-5px_30px_0px_rgba(185,185,185,0.25)] bg-fon">
            <nav className="flex justify-around items-center">
                {links.map((link) =>
                    <div className="cursor-pointer flex flex-col gap-1 items-center">
                        <Image src={link.img} width={24} height={24} alt=''/>
                        <Link href={link.link}>{link.name}</Link>
                    </div>
                )}

                <div className="cursor-pointer flex flex-col gap-1 items-center">
                    <div className="flex items-center gap-x-1">
                        <Image src={cart} width={24} height={24} alt=''/>
                        <span>(2)</span>
                    </div>
                        <Link href="#">Корзина</Link>
                </div>
            </nav>
        </div>
    );
};

export default NavBarM;