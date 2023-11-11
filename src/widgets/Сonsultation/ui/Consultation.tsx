import {FC} from "react";
import Image from "next/image";
import bg from "@/../public/Pages/Home/Consultation/bg.jpeg"
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";
import {fetchStatic} from "@/entities/Static";
import Link from "next/link";

interface ConsultationProps {

}

const Consultation: FC<ConsultationProps> = async ({}) => {
    const staticInf = await fetchStatic();

    return (
        <div className="relative pb-10">
            <div className="max-w-[1520px] w-full mx-auto relative py-8 px-2.5 md:px-5 lg:px-10 xl:px-20 bg-[rgba(242,242,241,0.80)] rounded-[10px] overflow-hidden">
                <Image fill className="-z-10 object-cover" src={bg} alt=""/>
                <h2 className="font-montserrat text-xl lg:text-3xl font-semibold text-center">Получите консультацию</h2>
                <p className="mt-5 lg:mt-8 text-center">Оставьте заявку прямо сейчас, менеджер нашего интернет-магазина
                    свяжется с Вами </p>
                <form className="flex flex-col mx-auto max-w-[436px] gap-y-4 mt-5 lg:mt-12">
                    <input
                        className="py-3.5 px-5 bg-transparent border-dark border-2 rounded outline-0 focus:border-accent"
                        type="text" placeholder="Имя"/>
                    <input
                        className="py-3.5 px-5 bg-transparent border-dark border-2 rounded outline-0 focus:border-accent"
                        type="tel" placeholder="Телефон"/>
                    <div className="flex gap-x-3.5 font-light text-[12px] items-start">
                        <input type="checkbox" id="poli" name="poli"/>
                        <label htmlFor="poli">Я принимаю условия <a href="" className="underline">Пользовательского
                            соглашения</a> и даю своё согласие на
                            обработку моей персональной информации на условиях, определенных <a href=""
                                                                                                className="underline">Политикой
                                конфиденциальности</a>.</label>
                    </div>
                    <button
                        className="w-fit mx-auto py-3.5 px-12 bg-dark rounded text-light font-montserrat text-base font-semibold transition-colors hover:bg-black"
                        type="submit">Оставить заявку
                    </button>
                </form>
                <div className="flex flex-col gap-y-4 items-center mt-5 font-montserrat text-base">
                    <p className="text-center font-semibold">
                        Или
                        <span className="block font-normal">позвоните по телефону:</span>
                    </p>
                    <a className="font-semibold" href={`tel:${staticInf.telephone}`}>{staticInf.telephone}</a>
                    <p>напишите нам в соц. сетях</p>
                    <div className="flex gap-x-2.5">
                        <Link target="_blank" href={staticInf.vkLink || ''}>
                            <Image className="md:w-12 md:h-12" width={40} height={40} src={vk} alt="ВК"/>
                        </Link>
                        <Link target="_blank" href={staticInf.telegramLink || ''}>
                            <Image className="md:w-12 md:h-12" width={40} height={40} src={telegram} alt="Телеграм"/>
                        </Link>
                        <Link target="_blank" href={staticInf.whatsAppLink || ''}>
                            <Image className="md:w-12 md:h-12" width={40} height={40} src={whatsapp} alt="Вотсапп"/>
                        </Link>
                        <Link target="_blank" href={staticInf.viberLink || ''}>
                            <Image className="md:w-12 md:h-12" width={40} height={40} src={viber} alt="Вайбер"/>
                        </Link>
                        <Link target="_blank" href={'mailto:' + staticInf.email}>
                            <Image className="md:w-12 md:h-12" width={40} height={40} src={mail} alt="Почта"/>
                        </Link>
                    </div>
                </div>
            </div
            >
            <div className="bg-light absolute top-0 left-0 w-full h-full -z-50"></div>
        </div>
    );
};

export default Consultation;