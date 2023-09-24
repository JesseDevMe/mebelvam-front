import {FC} from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
    id: number;
    name: string;
    count: number;
    imgUrl: string;
    slug: string;
}

const CategoryCard: FC<CategoryProps> = ({name, count, imgUrl, slug, id}) => {

    return (
            <Link href={`/catalog/${slug}-${id}`} className="w-[160px] md:w-[220px] lg:w-[300px] rounded bg-fon shadow-[0px_7px_30px_0px_rgba(182,_182,_178,_0.25)] transition-colors hover:text-accent">
                <div className="relative w-full h-[120px] md:h-[148px] lg:h-[200px]">
                    <Image className="rounded-t" fill src={imgUrl} style={{objectFit: 'cover'}} alt={name}/>
                </div>

                <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                    {name} ({count})
                </div>
            </Link>
    );
};

export default CategoryCard;