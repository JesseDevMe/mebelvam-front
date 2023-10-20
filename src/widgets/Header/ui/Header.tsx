'use client'
import Image from "next/image";
import logo from "@/../public/header/logo.svg"
import Link from "next/link";
import {Menu} from "@/features/Menu";
import {Search} from "@/features/Search";
import {useEffect, useRef, useState} from "react";
import heart from "@/../public/header/heart.svg";
import account from "@/../public/header/personal_account.svg";
import cart from "@/../public/header/icon_basket.svg";


const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isHeaderOpen, setIsHeaderOpen] = useState(true);

    const prevScroll = useRef(0)
    useEffect(() => {

        prevScroll.current = window.scrollY;
        let currentScroll: number;
        let offset = 0;

        const intervalId = setInterval(() => {
            if (offset < 0) offset = 0;
        }, 500);

        function onScroll(e: Event) {
            if (window.innerWidth < 768) return;

            currentScroll = window.scrollY;

            if (currentScroll < 180) {
                setIsHeaderOpen(true);
                return () => {
                    window.removeEventListener('scroll', onScroll);
                    clearInterval(intervalId);
                };
            }

            if (isHeaderOpen && prevScroll.current < currentScroll) {
                offset += currentScroll - prevScroll.current;

                if (offset > 180) {
                    setIsHeaderOpen(false);
                }
            }

            if (!isHeaderOpen && prevScroll.current > currentScroll) {
                offset -= prevScroll.current - currentScroll;

                if (offset < -180) {
                    setIsHeaderOpen(true);
                }
            }

            prevScroll.current = currentScroll
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearInterval(intervalId);
        }
    }, [isHeaderOpen])

    return (
        <div className={`md:sticky md:top-[-1px] bg-[rgba(242,242,241,0.7)] md:backdrop-blur transition-transform ${isHeaderOpen ? 'translate-y-0' : '-translate-y-full'} z-50`}>
            <header className={`px-2.5 md:px-5 lg:px-10 xl:px-20 w-full max-w-[1520px] mx-auto`}>
                <div className="py-1.5 flex justify-between items-center gap-x-2">
                    <div className={`flex items-center justify-between grow md:grow-0 ${isSearchOpen ? 'grow-0' : ''}`}>
                        <Menu/>
                        <Link
                            className={`pr-3 translate-x-[20px] + ${isSearchOpen ? 'max-[410px]:hidden' : ''} lg:hidden`}
                            href='/'
                        >
                            <Image src={logo} height={30} width={40} alt="Мебель Вам"/>
                        </Link>
                    </div>

                    <Link
                        className="hidden lg:block"
                        href='/'
                    >
                        <Image src={logo} height={48} width={65} alt="Мебель Вам"/>
                    </Link>

                    <div className="grow lg:grow-0 flex items-center justify-end gap-x-5">
                        <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen}/>

                        <Link className="hidden md:block" href="#">
                            <Image alt="Избранное" className="hover:scale-110 transition-transform" src={heart}/>
                        </Link>

                        <Link className="hidden md:block" href="#">
                            <Image alt="Аккаунт" className="hover:scale-110 transition-transform" src={account}/>
                        </Link>

                        <Link className="hidden md:flex px-2.5 py-1.5 items-center gap-x-2 border-[1px]
                            border-solid border-dark rounded hover:scale-110 transition-transform"
                              href="#"
                        >
                            <Image alt="Корзина"  src={cart}/>
                            <span>(2)</span>
                        </Link>
                    </div>

                </div>
            </header>
        </div>


    );
};

export default Header;