import Image from "next/image";
import burger from "@/../public/header/icon_burger.svg"
import logo from "@/../public/header/logo.svg"
import search from "@/../public/header/icon_searth.svg"
import Link from "next/link";
import {Menu} from "@/features/Menu";
import {Search} from "@/features/Search";

const Header = () => {
    return (
        <header className="px-2.5 py-1.5 absolute top-0 left-0 w-full flex justify-between items-center bg-[rgba(242,242,241,0.90)]">
            <div className="flex justify-between flex-1">
                <Menu/>
                <div className="flex items-center">
                    <Link href='/'>
                        <Image src={logo} height={30} width={41} alt="Мебель Вам"/>
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-end">
                <Search/>
            </div>

        </header>
    );
};

export default Header;