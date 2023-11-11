import {fetchStrapi} from "@/shared/API";
import {StaticInf} from "@/entities/Static";

export async function fetchStatic(): Promise<StaticInf> {
    const res = await fetchStrapi('/static-information');

    if (!res.ok) {
        return {
            telephone: '+7(978)815-58-28',
            email: 'oxy_sev@mail.ru',
            schedule: 'пн-пт—9:00 - 18:00, сб—10:00 - 16:00, вс—выходной'
        }
    }

    const { data } = await res.json();

    return {
        telephone: data.attributes.telephone_number,
        email: data.attributes.email,
        schedule: data.attributes.storage_schedule,
        vkLink: data.attributes.vk_link,
        telegramLink: data.attributes.telegram_link,
        viberLink: data.attributes.viber_link,
        whatsAppLink: data.attributes.whatsApp_link,
    }
}