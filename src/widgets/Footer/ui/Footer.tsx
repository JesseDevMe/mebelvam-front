import {FC} from "react";
import Image from "next/image";
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";
import logo from "@/../public/header/logo.svg"

interface FooterProps {

}

const Footer: FC<FooterProps> = ({}) => {

    return (
        <div className="bg-light rounded">
            <div className="max-w-[1520px] mx-auto text-[12px] pt-7 pb-20 md:pb-7 font-light px-5 md:px-5 lg:px-10 xl:px-20
                            grid grid-rows-[repeat(3,auto)] sm:grid sm:grid-cols-3 sm:grid-rows-none justify-center justify-items-center text-center gap-y-3.5 gap-x-5 leading-4"
            >
                <div className="order-1 max-w-[400px]">
                    <h2 className="font-normal text-sm">Контакты</h2>
                    <p className="mt-2.5"><span className="font-bold mt-2.5">Телефон:</span> +7 (978) 815-58-28</p>
                    <div className="flex gap-x-2.5 mt-3.5">
                        <a href="#">
                            <Image className="lg:w-12 lg:h-12" width={24} height={24} src={vk} alt="ВК"/>
                            {/*<Image className="hidden lg:block" width={48} height={48} src={vk} alt="ВК"/>*/}
                        </a>
                        <a href="#">
                            <Image className="lg:w-12 lg:h-12" width={24} height={24} src={telegram} alt="Телеграм"/>
                        </a>
                        <a href="#">
                            <Image className="lg:w-12 lg:h-12" width={24} height={24} src={whatsapp} alt="Вотсапп"/>
                        </a>
                        <a href="#">
                            <Image className="lg:w-12 lg:h-12" width={24} height={24} src={viber} alt="Вайбер"/>
                        </a>
                        <a href="#">
                            <Image className="lg:w-12 lg:h-12" width={24} height={24} src={mail} alt="Почта"/>
                        </a>
                    </div>
                </div>

                <div className="order-2 sm:order-3 max-w-[400px]">
                    <h2 className="font-normal text-sm">Доставка со склада</h2>
                    <p className="mt-2.5">У нас большой склад, поэтому все основные позиции есть в наличии. Это
                        позволяет нам быстро доставлять заказы по низким ценам.</p>
                    <p><span className="font-bold block mt-2.5">Склад работает:</span> пн-пт—9:00 - 18:00, сб—10:00 -
                        16:00, вс—выходной</p>
                </div>

                <div className="order-3 sm:order-2 flex flex-col items-center gap-y-3.5 max-w-[400px]">
                    <Image src={logo} width={70} height={50} alt="Мебель вам"/>
                    <p>Интернет-магазин мебели в Севастополе</p>
                    <p>Информация на сайте не является публичной офертой.</p>
                    <p>Интернет-магазин «Мебель Вам» © 2023</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;