'use client'
import Image from "next/image";
import logo from "@/../public/header/logo.svg"
import Link from "next/link";
import {Menu} from "@/features/Menu";
import {Search} from "@/features/Search";
import {useEffect, useRef, useState} from "react";
import heart from "@/../public/header/heart.svg";
import {HeaderCartBtn} from "@/features/HeaderCartBtn";
import {AccountLink} from "@/features/AccountLink";


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

                <div className={`py-1.5 grid ${isSearchOpen ? 'grid-cols-[auto,1fr] min-[400px]:grid-cols-[auto,auto,1fr]' : 'grid-cols-[1fr,auto,1fr]'} 
                      md:grid-cols-[auto,auto,1fr] lg:grid-cols-[1fr,auto,1fr] gap-x-2 items-center md:py-2.5`}
                >
                    <Menu/>

                    <div className={`${isSearchOpen ? 'hidden' : 'block'} min-[400px]:block`}>
                        <Link
                            href='/'
                        >
                            <Image
                                className="h-auto md:w-[49px] lg:w-[57px]"
                                src={logo}
                                alt="Мебель Вам"
                            />
                        </Link>
                    </div>

                    <div className="flex justify-end gap-x-5 items-center">
                        <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen}/>

                        <Link className="hidden md:block" href={'/favorites'}>
                            <Image alt="Избранное" width={28} height={26} className="hover:scale-110 transition-transform" src={heart}/>
                        </Link>

                        <div className="hidden md:block">
                            <AccountLink/>
                        </div>

                        <HeaderCartBtn/>
                    </div>

                </div>
            </header>
        </div>


    );
};

export default Header;