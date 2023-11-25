import {revalidatePath} from "next/cache";

export async function fetchStrapi(url: string, options?: RequestInit): Promise<Response> {
    return await fetch(process.env.STRAPI_URL + '/api' + url,
        {next: {tags: ['all'], revalidate: 2592000 }, ...options}
    );
}

//{next: {revalidate: 1}}
//next: {tags: ['all'], revalidate: 2592000 }
