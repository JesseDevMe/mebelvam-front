import {type NextRequest} from 'next/server'
import {fetchStrapi} from "@/shared/API";

export async function PUT(request: NextRequest) {
    const { ids }: {ids: number[]} = await request.json();

    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({error: {message: 'Authorization header is empty'}}, {status: 400})
    }

    if (!ids) {
        return Response.json({error: {message: 'Body param (id) is empty'}}, {status: 400});
    }

    const userRes = await fetchStrapi('/users/me?populate[favorites][fields][0]=id', {
        headers: {
            Authorization: authToken,
        },
        next: {revalidate: 0}
    })

    if (!userRes.ok) {
        const errorData = await userRes.json();
        return Response.json(errorData, {status: userRes.status});
    }

    const userData = await userRes.json();
    const userId: number = userData.id;
    let favoritesId: number[] = userData.favorites.map((favorite: any) => favorite.id);

    if (ids.length === 0) {
        return Response.json({ids: favoritesId})
    }

    favoritesId.push(...ids);

    favoritesId = favoritesId.filter(function(item, pos){
        return favoritesId.indexOf(item)== pos;
    })
    const updateRes = await fetchStrapi(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GOD_TOKEN}`
        },
        body: JSON.stringify({
            favorites: favoritesId,
        }),
        next: {revalidate: 0}
    })

    if (!updateRes.ok) {
        const updateData = await updateRes.json();
        return Response.json(updateData, {status: updateRes.status});
    }

    return Response.json({ids: favoritesId});
}

export async function PATCH(request: NextRequest) {
    const { ids }: {ids: number[]} = await request.json();
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({error: {message: 'Authorization header is empty'}})
    }

    if (!ids) {
        return Response.json({error: {message: 'Body param (id) is empty'}});
    }

    const userRes = await fetchStrapi('/users/me', {
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
            favorites: ids,
        }),
        next: {revalidate: 0}
    })

    if (!updateRes.ok) {
        const updateData = await updateRes.json();
        return Response.json(updateData, {status: updateRes.status});
    }

    return Response.json({ids: ids})
}