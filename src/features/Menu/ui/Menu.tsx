'use client'
import {FC, useEffect, useRef, useState} from "react";
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
        link: '/catalog',
    },
    {
        name: 'О нас',
        link: '/#aboutus',
    },
    {
        name: 'Отзывы',
        link: '/#feedback',
    },
    {
        name: 'Сотрудничество',
        link: '/partners',
    },
    {
        name: 'Акции',
        link: '/catalog/promos',
    },
]

const Menu: FC<MenuProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function modalToggle() {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div onClick={modalToggle} className="p-2 cursor-pointer lg:hidden">
                <Image src={burger} height={16} width={24} alt='Меню'/>
            </div>

            <nav className="hidden lg:flex gap-x-7 ">
                {navList.map(nav =>
                    <Link key={nav.name} className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)} href={nav.link}>{nav.name}</Link>
                )}
            </nav>

            <Modal
                setClose={() => setIsOpen(false)}
                open={isOpen}
            >
                <div className="flex flex-col gap-y-5 pt-5 pl-7 pr-7">
                    <div onClick={modalToggle} className="p-2 cursor-pointer">
                        <Image src={cross} height={16} width={16} alt='Закрыть меню'/>
                    </div>
                    <nav className="flex flex-col gap-y-5">
                        {navList.map((navLink) =>
                            <Link onClick={modalToggle} key={navLink.name}
                                  className="pb-2.5 border-b-[1px] hover:text-accent transition-colors"
                                  href={navLink.link}>
                                {navLink.name}
                            </Link>
                        )}
                    </nav>
                </div>
            </Modal>
        </div>
    );
};

export default Menu;