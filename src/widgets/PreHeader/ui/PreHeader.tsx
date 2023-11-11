import {FC} from "react";
import Image from "next/image";
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";
import {StaticInf} from "@/entities/Static";
import {fetchStatic} from "@/entities/Static";
import Link from "next/link";

interface PreHeaderProps {

}

const PreHeader: FC<PreHeaderProps> = async ({}) => {
    const staticInf: StaticInf = await fetchStatic();

    return (
        <div className="z-50 border-x bg-[rgba(242,242,241,0.7)]">
            <div className="max-w-[1520px] mx-auto px-2.5 md:px-5 lg:px-10 xl:px-20 w-full">
                <div className="hidden md:flex justify-between items-center pt-5 pb-2.5 border-b-2 border-dark">
                    <Link href={`tel:${staticInf.telephone}`}>{staticInf.telephone}</Link>

                    <div className="flex gap-x-2.5">
                        <Link target="_blank" href={staticInf.vkLink || ''}>
                            <Image width={24} height={24} src={vk} alt="ВК"/>
                        </Link>
                        <Link target="_blank" href={staticInf.telegramLink || ''}>
                            <Image width={24} height={24} src={telegram} alt="Телеграм"/>
                        </Link>
                        <Link target="_blank" href={staticInf.whatsAppLink || ''}>
                            <Image width={24} height={24} src={whatsapp} alt="Вотсапп"/>
                        </Link>
                        <Link target="_blank" href={staticInf.viberLink || ''}>
                            <Image width={24} height={24} src={viber} alt="Вайбер"/>
                        </Link>
                        <Link target="_blank" href={'mailto:' + staticInf.email}>
                            <Image width={24} height={24} src={mail} alt="Почта"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreHeader;