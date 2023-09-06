'use client'
import {FC, useState} from "react";
import Image from "next/image";
import search from "../../../../public/header/icon_searth.svg";

interface SearchProps {

}

const Search: FC<SearchProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleSearch() {
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    return (
        <div className="flex items-center gap-x-1">
            <input className={`h-6 rounded ${isOpen ? '' : 'hidden'}`} type="text"/>

            <div onClick={handleSearch} className="p-2">
                <Image src={search} height={24} width={24} alt='Поиск'/>
            </div>
        </div>

    );
};

export default Search;