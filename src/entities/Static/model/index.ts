import {fetchStrapi} from "@/shared/API";
import {StaticInf} from "@/entities/Static";

export async function fetchStatic(): Promise<StaticInf> {
    const res = await fetchStrapi('/static-information');

    if (!res.ok) {
        return {
            telephone: '+7 (978) 815-58-28',
            email: 'oxy_sev@mail.ru',
            schedule: 'пн-пт—9:00 - 18:00, сб—10:00 - 16:00, вс—выходной',
            vkLink: 'https://vk.com/club15354394',
            viberLink: 'https://tinyurl.com/2r7jzrhd',
            whatsAppLink: 'https://wa.me/79788155828',
            telegramLink: 'https://t.me/+79788155828',
        }
    }

    const { data } = await res.json();

    return {
        telephone: data.attributes.telephone_number || '+7 (978) 815-58-28',
        email: data.attributes.email || 'oxy_sev@mail.ru',
        schedule: data.attributes.storage_schedule || 'пн-пт—9:00 - 18:00, сб—10:00 - 16:00, вс—выходной',
        vkLink: data.attributes.vk_link,
        telegramLink: data.attributes.telegram_link,
        viberLink: data.attributes.viber_link,
        whatsAppLink: data.attributes.whatsApp_link,
    }
}