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
                    <a className="hover:text-accent" href={`tel:${staticInf.telephone}`}>{staticInf.telephone}</a>

                    <div className="flex gap-x-2.5">
                        { staticInf.vkLink &&
                            <a target="_blank" href={staticInf.vkLink}>
                                <Image src={vk} alt="ВК"/>
                            </a>
                        }
                        { staticInf.telegramLink &&
                            <a target="_blank" href={staticInf.telegramLink}>
                                <Image src={telegram} alt="Телеграм"/>
                            </a>
                        }
                        { staticInf.whatsAppLink &&
                            <a target="_blank" href={staticInf.whatsAppLink}>
                                <Image src={whatsapp} alt="Вотсапп"/>
                            </a>
                        }
                        { staticInf.viberLink &&
                            <a target="_blank" href={staticInf.viberLink}>
                                <Image src={viber} alt="Вайбер"/>
                            </a>
                        }
                        <a target="_blank" href={'mailto:' + staticInf.email}>
                            <Image src={mail} alt="Почта"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreHeader;