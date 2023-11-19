import {FC} from "react";
import Image from "next/image";

interface PartnerProps {
    imageUrl: string;
    name: string;
    description: string;
}

const PartnerCard: FC<PartnerProps> = ({ imageUrl, name, description }) => {

    return (
        <div className="flex flex-col gap-x-[30px] lg:flex-row">
            <div className="relative mx-auto max-w-[500px] w-full lg:w-2/5 h-[200px] rounded overflow-hidden lg:self-center">
                <Image
                    src={imageUrl} fill={true}
                    sizes="100wh, (min-width: 500px) 500px, (min-width: 1024px) 40vw"
                    style={{objectFit: 'contain'}} alt='Мебельная фабрика "BTS"'
                />
            </div>
            <div className="lg:w-3/5 ">
                <h2 className="mt-5 font-montserrat text-base font-semibold">{name}</h2>
                <p className="mt-[30px] whitespace-pre-line">{description}</p>
            </div>
        </div>
    );
};

export default PartnerCard;