import {FC} from "react";
import Link from "next/link";
import {furModule} from "@/entities/Furniture/types";
import Image from "next/image";
import {FavoritesBtn} from "@/features/FavoritesBtn";

interface ModuleCardProps extends furModule {

}

const ModuleCard: FC<ModuleCardProps> = ({ id, name, count, imageUrl }) => {

    return (
        <Link href={`/product/${id}`} className="relative border border-[#E9E9E9] rounded bg-fon min-h-[250px]
                shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.20)]">
            <div className="relative overflow-hidden w-full aspect-[1/1] shrink-0">
                <Image draggable={false} fill style={{objectFit: 'contain'}} src={imageUrl} alt={''}/>
            </div>
            <div className="p-2.5 md:p-3.5">
                <p className="h-[2.9em] line-clamp-2">{name}</p>
                <p className="self-end text-[12px] font-light mt-2.5 ml-auto w-fit">{count} шт.</p>
            </div>

            <FavoritesBtn id={id}/>

        </Link>
    );
};

export default ModuleCard;