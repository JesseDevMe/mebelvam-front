import {type NextRequest} from 'next/server'
import {fetchStrapi} from "@/shared/API";
import {CartItem} from "@/entities/Cart";

export async function GET(request: NextRequest) {
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({error: {message: 'Authorization header is empty'}})
    }


    const userRes = await fetchStrapi('/users/me?fields=id&populate[cart][populate][furniture][fields]=id', {
        headers: {
            Authorization: authToken,
        }
    })

    if (!userRes.ok) {
        return Response.json({error: {message: 'User data fetch failed'}});
    }

    const userData = await userRes.json();

    return Response.json({
        userId: userData.id,
        cart: userData.cart?.map((item: any): CartItem => ({
            count: item.count,
            variant_id: item.variant_id,
            attribute_id: item.attribute_id,
            id: item.furniture.id,
        }))
    });
}

export async function PUT(request: NextRequest) {
    const cart: CartItem[] = await request.json();

    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({error: {message: 'Authorization header is empty'}})
    }

    if (!cart) {
        return Response.json({error: {message: 'Body is empty'}});
    }

    const userRes = await fetchStrapi('/users/me?fields=id', {
        headers: {
            Authorization: authToken,
        }
    })

    if (!userRes.ok) {
        return Response.json({error: {message: 'User data fetch failed'}});
    }

    const userData = await userRes.json();
    const userId: number = userData.id;

    const updateRes = await fetchStrapi(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GOD_TOKEN}`
        },
        body: JSON.stringify({
            cart: cart.map((item) => (
                {
                    count: item.count,
                    variant_id: item.variant_id,
                    attribute_id: item.attribute_id,
                    furniture: {
                        id: item.id
                    }
                }
            ))
        })
    })

    if (!updateRes.ok) {
        return Response.json({error: {message: 'Cart PUT to strapi error'}});
    }

    return Response.json({status: 'ok'});
}