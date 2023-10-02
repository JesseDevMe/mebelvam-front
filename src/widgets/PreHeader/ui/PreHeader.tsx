import {FC} from "react";
import Image from "next/image";
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";

interface PreHeaderProps {

}

const PreHeader: FC<PreHeaderProps> = ({}) => {

    return (
        <div className="z-50 border-x bg-[rgba(242,242,241,0.7)]">
            <div className="max-w-[1520px] mx-auto px-2.5 md:px-5 lg:px-10 xl:px-20 w-full">
                <div className="hidden md:flex justify-between items-center pt-5 pb-2.5 border-b-2 border-dark">
                    <a href="tel:+79788155828">+7(978)815-58-28</a>

                    <div className="flex gap-x-2.5">
                        <a href="#">
                            <Image width={24} height={24} src={vk} alt="ВК"/>
                        </a>
                        <a href="#">
                            <Image width={24} height={24} src={telegram} alt="Телеграм"/>
                        </a>
                        <a href="#">
                            <Image width={24} height={24} src={whatsapp} alt="Вотсапп"/>
                        </a>
                        <a href="#">
                            <Image width={24} height={24} src={viber} alt="Вайбер"/>
                        </a>
                        <a href="#">
                            <Image width={24} height={24} src={mail} alt="Почта"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreHeader;