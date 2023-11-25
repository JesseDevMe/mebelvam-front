import {FC} from "react";
import Image from "next/image";
import bg from "@/../public/Pages/Home/Consultation/bg.jpeg"
import vk from "../../../../public/header/VK.svg";
import telegram from "../../../../public/header/Telegram.svg";
import whatsapp from "../../../../public/header/WhatsApp.svg";
import viber from "../../../../public/header/Viber.svg";
import mail from "../../../../public/header/Mail_ru.svg";
import {fetchStatic} from "@/entities/Static";
import {ConsultationForm} from "@/widgets/ConsultationForm";

interface ConsultationProps {

}

const Consultation: FC<ConsultationProps> = async ({}) => {
    const staticInf = await fetchStatic();

    return (
        <div id="consultation" className="relative pb-10">
            <div className="max-w-[1520px] w-full mx-auto relative py-8 px-2.5 md:px-5 lg:px-10 xl:px-20 bg-[rgba(242,242,241,0.80)] rounded-[10px] overflow-hidden">
                <Image fill className="-z-10 object-cover" src={bg} alt=""/>
                <h2 className="font-montserrat text-xl lg:text-3xl font-semibold text-center">Получите консультацию</h2>
                <p className="mt-5 lg:mt-8 text-center">Оставьте заявку прямо сейчас, менеджер нашего интернет-магазина
                    свяжется с Вами </p>
                <ConsultationForm/>
                <div className="flex flex-col gap-y-4 items-center mt-5 font-montserrat text-base">
                    <p className="text-center font-semibold">
                        Или
                        <span className="block font-normal">позвоните по телефону:</span>
                    </p>
                    <a className="font-semibold" href={`tel:${staticInf.telephone}`}>{staticInf.telephone}</a>
                    <p>напишите нам в соц. сетях</p>
                    <div className="flex gap-x-2.5 flex-wrap">
                        { staticInf.vkLink &&
                            <a target="_blank" href={staticInf.vkLink}>
                                <Image className="w-10 h-10 md:w-12 md:h-12" src={vk} alt="ВК"/>
                            </a>
                        }
                        { staticInf.telegramLink &&
                            <a target="_blank" href={staticInf.telegramLink}>
                                <Image className="w-10 h-10 md:w-12 md:h-12" src={telegram} alt="Телеграм"/>
                            </a>
                        }
                        { staticInf.whatsAppLink &&
                            <a target="_blank" href={staticInf.whatsAppLink}>
                                <Image className="w-10 h-10 md:w-12 md:h-12" src={whatsapp} alt="Вотсапп"/>
                            </a>
                        }
                        { staticInf.viberLink &&
                            <a target="_blank" href={staticInf.viberLink}>
                                <Image className="w-10 h-10 md:w-12 md:h-12" src={viber} alt="Вайбер"/>
                            </a>
                        }

                        <a target="_blank" href={'mailto:' + staticInf.email}>
                            <Image className="w-10 h-10 md:w-12 md:h-12" src={mail} alt="Почта"/>
                        </a>
                    </div>
                </div>
            </div
            >
            <div className="bg-light absolute top-0 left-0 w-full h-full -z-50"></div>
        </div>
    );
};

export default Consultation;