import {FC} from "react";
import Image from "next/image";
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";
import logo from "@/../public/header/logo.svg"
import {fetchStatic, StaticInf} from "@/entities/Static";
import Link from "next/link";

interface FooterProps {

}

const Footer: FC<FooterProps> = async ({}) => {
    const staticInf: StaticInf = await fetchStatic();


    return (
        <div className="bg-light rounded">
            <div className="max-w-[1520px] mx-auto text-[12px] pt-7 pb-20 md:pb-7 font-light px-5 md:px-5 lg:px-10 xl:px-20
                            grid grid-rows-[repeat(3,auto)] sm:grid sm:grid-cols-3 sm:grid-rows-none justify-center justify-items-center text-center gap-y-3.5 gap-x-5 leading-4"
            >
                <div className="order-1 max-w-[400px]">
                    <h2 className="font-normal text-sm">Контакты</h2>
                    <p className="mt-2.5"><span className="font-bold mt-2.5">Телефон:</span>
                        <a href={`tel:${staticInf.telephone}`}> {staticInf.telephone}</a>
                    </p>
                    <div className="flex gap-x-2.5 mt-3.5">
                        <a target="_blank" href={staticInf.vkLink || ''}>
                            <Image className="lg:w-12 lg:h-12" src={vk} alt="ВК"/>
                        </a>
                        <a target="_blank" href={staticInf.telegramLink || ''}>
                            <Image className="lg:w-12 lg:h-12" src={telegram} alt="Телеграм"/>
                        </a>
                        <a target="_blank" href={staticInf.whatsAppLink || ''}>
                            <Image className="lg:w-12 lg:h-12" src={whatsapp} alt="Вотсапп"/>
                        </a>
                        <a target="_blank" href={staticInf.viberLink || ''}>
                            <Image className="lg:w-12 lg:h-12" src={viber} alt="Вайбер"/>
                        </a>
                        <a target="_blank" href={'mailto:' + staticInf.email}>
                            <Image className="lg:w-12 lg:h-12" src={mail} alt="Почта"/>
                        </a>
                    </div>
                </div>

                <div className="order-2 sm:order-3 max-w-[400px]">
                    <h2 className="font-normal text-sm">Доставка со склада</h2>
                    <p className="mt-2.5">У нас большой склад, поэтому все основные позиции есть в наличии. Это
                        позволяет нам быстро доставлять заказы по низким ценам.</p>
                    <p><span className="font-bold block mt-2.5">Склад работает:</span> {staticInf.schedule}</p>
                </div>

                <div className="order-3 sm:order-2 flex flex-col items-center gap-y-3.5 max-w-[400px]">
                    <Image className="w-[70px] h-auto" src={logo} alt="Мебель вам"/>
                    <p>Интернет-магазин мебели в Севастополе</p>
                    <p>Информация на сайте не является публичной офертой.</p>
                    <p>Интернет-магазин «Мебель Вам» © 2023</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;