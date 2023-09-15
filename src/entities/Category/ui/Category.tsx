import {FC} from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
    name: string;
    count: number;
    imgUrl: string;
}

const Category: FC<CategoryProps> = ({name, count, imgUrl}) => {

    return (
            <Link href="#" className="w-[160px] md:w-[220px] lg:w-[300px] rounded bg-light shadow-[0px_7px_30px_0px_rgba(182,_182,_178,_0.25)]">
                <div className="relative w-full h-[120px] md:h-[148px] lg:h-[200px]">
                    <Image className="rounded-t" fill src={imgUrl} style={{objectFit: 'cover'}} alt={name}/>
                </div>

                <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                    {name} ({count})
                </div>
            </Link>
    );
};

export default Category;