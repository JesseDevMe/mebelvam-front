'use client'
import Image from "next/image";
import logo from "@/../public/header/logo.svg"
import Link from "next/link";
import {Menu} from "@/features/Menu";
import {Search} from "@/features/Search";
import {useEffect, useRef, useState} from "react";
import heart from "@/../public/header/heart.svg";
import cart from "@/../public/header/icon_basket.svg";
import {LogInButton} from "@/features/LogInButton";
import {HeaderCartBtn} from "@/features/HeaderCartBtn";


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

                        <Link className="hidden md:block" href="/favorites">
                            <Image alt="Избранное" className="hover:scale-110 transition-transform" src={heart}/>
                        </Link>


                        <div className="hidden md:block">
                            <LogInButton>
                                <svg className="hover:scale-110 transition-transform" width="24" height="26" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12.5" cy="6" r="4.25" stroke="#292A2D" strokeWidth="1.5"/>
                                    <path d="M22.5 23V20.9737C22.5 20.3288 22.396 19.6881 22.1921 19.0763L21.8675 18.1026C21.0509 15.6526 18.758 14 16.1754 14H12.5H8.82456C6.24197 14 3.94914 15.6526 3.13246 18.1026L2.8079 19.0763C2.60397 19.6881 2.5 20.3288 2.5 20.9737V23" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </LogInButton>
                        </div>

                        <HeaderCartBtn/>
                    </div>

                </div>
            </header>
        </div>


    );
};

export default Header;