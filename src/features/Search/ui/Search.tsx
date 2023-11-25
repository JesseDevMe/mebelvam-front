'use client'
import {Dispatch, FC, SetStateAction, useState} from "react";
import Image from "next/image";
import search from "../../../../public/header/icon_searth.svg";
import cross from "../../../../public/header/cross.svg";
import {useRouter} from "next/navigation";

interface SearchProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<SearchProps> = ({isOpen, setIsOpen}) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const router = useRouter();

    function toggleSearch() {
            setIsOpen(!isOpen);
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setSearchQuery('');
        setIsOpen(false);
        router.push('/search?q=' + searchQuery);
    }

    return (
        <div className="flex items-center">
            <div className={`flex w-[230px] py-1 px-3 bg-fon rounded border-[1px] border-dark ${isOpen ? '' : 'hidden'} md:flex`}>
                <span>
                    <svg focusable={false} xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                        <g opacity="0.5">
                            <circle cx="7" cy="8" r="6" stroke="#292A2D" strokeWidth="2"/>
                            <path d="M11 13L16 18" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                        </g>
                    </svg>
                </span>
                <form onSubmit={(e) => handleSearch(e)}>
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        placeholder="Искать"
                        className="px-1.5 outline-0 bg-fon" type="text"
                    />
                </form>
            </div>

            <div onClick={toggleSearch} className="w-10 h-10 flex justify-center items-center md:hidden">
                {
                    isOpen
                    ? <Image src={cross} height={18} width={18} alt='Закрыть поиск'/>

                    : <Image src={search} height={24} width={24} alt='Поиск'/>
                }
            </div>
        </div>

    );
};

export default Search;