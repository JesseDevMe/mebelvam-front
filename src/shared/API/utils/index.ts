import {revalidatePath} from "next/cache";

export async function fetchStrapi(url: string, options?: RequestInit): Promise<Response> {
    return await fetch(process.env.STRAPI_URL + '/api' + url, options);
}
