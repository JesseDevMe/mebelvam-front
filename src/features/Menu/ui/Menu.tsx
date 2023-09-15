'use client'
import {FC, useState} from "react";
import Image from "next/image";
import burger from "../../../../public/header/icon_burger.svg";
import cross from "../../../../public/header/cross.svg";
import {Modal} from "@/shared/Modal";
import Link from "next/link";

interface MenuProps {

}

interface NavLink {
    name:string;
    link: string;
}

const navList: NavLink[] = [
    {
        name: 'Каталог',
        link: '#',
    },
    {
        name: 'О нас',
        link: '#aboutus',
    },
    {
        name: 'Отзывы',
        link: '#feedback',
    },
    {
        name: 'Сотрудничество',
        link: '#',
    },
    {
        name: 'Акции',
        link: '#',
    },
]

const Menu: FC<MenuProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function modalToggle() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div onClick={modalToggle} className="p-2 cursor-pointer lg:hidden">
                <Image src={burger} height={16} width={24} alt='Меню'/>
            </div>

            <nav className="hidden lg:flex gap-x-7 ">
                {navList.map(nav =>
                    <Link onClick={() => setIsOpen(false)} href={nav.link}>{nav.name}</Link>
                )}
            </nav>

            <Modal open={isOpen}>
                <div className="fixed top-0 left-0 w-screen h-screen md:w-[360px] bg-fon z-50">
                    <div className="flex flex-col gap-y-5 pt-5 pl-7 pr-7">
                        <div onClick={modalToggle} className="p-2 cursor-pointer">
                            <Image src={cross} height={16} width={16} alt='Закрыть меню'/>
                        </div>
                        <nav className="flex flex-col gap-y-5">
                            {navList.map((navLink) =>
                                <Link onClick={() => setIsOpen(false)} key={navLink.name} className="pb-2.5 border-b-[1px]" href={navLink.link}>
                                    {navLink.name}
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Menu;