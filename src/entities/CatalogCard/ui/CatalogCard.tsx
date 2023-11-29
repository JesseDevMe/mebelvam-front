import {FC} from "react";
import Link from "next/link";
import Image from "next/image";

interface CatalogCardProps {
    id: number;
    name: string;
    count: number | undefined;
    imgUrl: string;
    slug: string;
}

const CatalogCard: FC<CatalogCardProps> = ({name, count, imgUrl, slug, id}) => {

    return (
        <Link href={`/catalog/${slug}-${id}`} className="rounded-[5px] bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
                <Image
                    className="rounded-t-[5px]" fill
                    sizes="50vw,(min-width: 520px) 33vw,(min-width: 1024px) 25vw"
                    src={imgUrl} style={{objectFit: 'cover'}}
                    alt={name}/>
            </div>

            <div className="font-semibold text-sm md:text-base py-5 px-2.5">
                {name} {count !== undefined ? `(${count})` : ''}
            </div>
        </Link>
    );
};

export default CatalogCard;