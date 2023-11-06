import {FC} from "react";
import {CollectionMini} from "@/entities/Collection/types";
import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps extends CollectionMini {

}

const CollectionCard: FC<CollectionCardProps> = ({ id, name, imageUrl }) => {

    return (
        <Link href={`/catalog/collections/${id}`} className="min-w-[160px] md:min-w-[220px] min-[1440px]:min-w-[300px] rounded bg-fon shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] transition-colors hover:text-accent">
            <div className="relative w-full aspect-[4/3]">
                <Image className="rounded-t" fill src={imageUrl} style={{objectFit: 'cover'}} alt={name}/>
            </div>

            <div className="font-semibold font-montserrat text-sm md:text-base py-5 px-2.5">
                {name}
            </div>
        </Link>
    );
};

export default CollectionCard;