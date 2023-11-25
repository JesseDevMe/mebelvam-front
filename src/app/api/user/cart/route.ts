import {type NextRequest} from 'next/server'
import {fetchStrapi} from "@/shared/API";
import {CartItem} from "@/entities/Cart";

export async function GET(request: NextRequest) {
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({error: {message: 'Authorization header is empty'}}, {status: 400})
    }


    const userRes = await fetchStrapi('/users/me?fields=id&populate[cart][populate][furniture][fields]=id', {
        headers: {
            Authorization: authToken,
        },
        next: {revalidate: 0}
    })

    if (!userRes.ok) {
        const userData = await userRes.json();
        return Response.json(userData, {status: userRes.status});
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
        return Response.json({error: {message: 'Authorization header is empty'}}, {status: 400})
    }

    if (!cart) {
        return Response.json({error: {message: 'Body is empty'}}, {status: 400});
    }

    const userRes = await fetchStrapi('/users/me?fields=id', {
        headers: {
            Authorization: authToken,
        },
        next: {revalidate: 0}
    })

    if (!userRes.ok) {
        const userData = await userRes.json();
        return Response.json(userData, {status: userRes.status});
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
        }),
        next: {revalidate: 0}
    })

    if (!updateRes.ok) {
        const updateData = await updateRes.json();
        return Response.json(updateData, {status: updateRes.status});
    }

    return Response.json({status: 'ok'});
}