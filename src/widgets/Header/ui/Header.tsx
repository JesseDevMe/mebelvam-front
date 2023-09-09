'use client'
import Image from "next/image";
import logo from "@/../public/header/logo.svg"
import Link from "next/link";
import {Menu} from "@/features/Menu";
import {Search} from "@/features/Search";
import {useState} from "react";
import heart from "@/../public/header/heart.svg";
import account from "@/../public/header/personal_account.svg";
import cart from "@/../public/header/icon_basket.svg";
import vk from "@/../public/header/VK.svg";
import telegram from "@/../public/header/Telegram.svg";
import whatsapp from "@/../public/header/WhatsApp.svg";
import viber from "@/../public/header/Viber.svg";
import mail from "@/../public/header/Mail_ru.svg";


const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="px-2.5 md:px-5 top-0 left-0 w-full bg-[rgba(242,242,241,0.90)]">
            <div className="hidden md:flex justify-between items-center pt-5 pb-2.5 border-b-2 border-dark">
                <a href="tel:+79788155828">+7(978)815-58-28</a>

                <div className="flex gap-x-2.5">
                    <a href="#">
                        <Image width={24} height={24} src={vk} alt="ВК"/>
                    </a>
                    <a href="#">
                        <Image width={24} height={24} src={telegram} alt="Телеграм"/>
                    </a>
                    <a href="#">
                        <Image width={24} height={24} src={whatsapp} alt="Вотсапп"/>
                    </a>
                    <a href="#">
                        <Image width={24} height={24} src={viber} alt="Вайбер"/>
                    </a>
                    <a href="#">
                        <Image width={24} height={24} src={mail} alt="Почта"/>
                    </a>
                </div>
            </div>

            <div className="py-1.5 flex justify-between items-center gap-x-2">
                <div className={`flex items-center justify-between grow-[1] md:grow-0 ${isSearchOpen ? 'grow-0' : ''}`}>
                    <Menu/>
                    <Link className={`pr-3 translate-x-[20px] + ${isSearchOpen ? 'max-[410px]:hidden' : ''}`} href='/'>
                        <Image src={logo} height={30} width={40} alt="Мебель Вам"/>
                    </Link>
                </div>

                <div className="grow-[1] flex items-center justify-end gap-x-5">
                    <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen}/>

                    <Link className="hidden md:block" href="#">
                        <Image alt="Избранное" src={heart}/>
                    </Link>

                    <Link className="hidden md:block" href="#">
                        <Image alt="Аккаунт" src={account}/>
                    </Link>

                    <Link className="hidden md:flex px-2.5 py-1.5 items-center gap-x-2 border-[1px]
                            border-solid border-dark rounded"
                          href="#"
                    >
                        <Image alt="Корзина" src={cart}/>
                        <span>(2)</span>
                    </Link>
                </div>

            </div>
        </header>

    );
};

export default Header;