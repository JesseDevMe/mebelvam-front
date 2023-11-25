import {type NextRequest} from 'next/server'
import {fetchStrapi} from "@/shared/API";
import {UserData} from "@/entities/User";

export async function GET(request: NextRequest) {
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({
            data: null,
            error: {
                status: 401,
                message: 'Authorization header is empty',
            }
        })
    }


    const userRes = await fetchStrapi('/users/me', {
        headers: {
            Authorization: authToken,
        },
        next: {revalidate: 0}
    })

    if (!userRes.ok) {
        const data = await userRes.json();
        return Response.json(data);
    }

    const data = await userRes.json();
    const userData: UserData = {
        name: data.name,
        middleName: data.middlename,
        email: data.email,
        telephone: data.telephone,
    }

    return Response.json(userData);
}

export async function PUT(request: NextRequest) {
    const userBody: UserData = await request.json();

    const authToken = request.headers.get('Authorization');

    if (!authToken) {
        return Response.json({
            data: null,
            error: {
                status: 401,
                message: 'Authorization header is empty',
            }
        })
    }

    if (!userBody) {
        return Response.json({error: {message: 'Body is empty'}});
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(userBody.email)) {
        return Response.json({error: {message: 'Invalid e-mail'}});
    }

    const userRes = await fetchStrapi('/users/me?fields=id', {
        headers: {
            Authorization: authToken,
        },
        next: {revalidate: 0}
    })

    if (!userRes.ok) {
        const failedData = await userRes.json();
        return Response.json(failedData);
    }

    const userData = await userRes.json();
    const userId: number = userData.id;

    const resByEmail = await fetchStrapi(`/users?filters[email]=${userBody.email.toLowerCase()}&fields[0]=id`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GOD_TOKEN}`,
            },
            next: {revalidate: 0}
        }
    )

    if (!resByEmail.ok) {
        const failedData = await resByEmail.json();
        return Response.json(failedData);
    }

    const usersByEmail = await resByEmail.json();
    if (usersByEmail.length > 0 && !usersByEmail.some((user: any) => user.id === userId)) {
        return Response.json({error: {message: 'Email is exist'}});
    }

    const newData: any = {};
    userBody.name && (newData.name = userBody.name);
    userBody.middleName && (newData.middlename = userBody.middleName);
    userBody.email && (newData.email = userBody.email);
    userBody.telephone && (newData.telephone = userBody.telephone);

    const updateRes = await fetchStrapi(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GOD_TOKEN}`
        },
        body: JSON.stringify(
            newData
        ),
        next: {revalidate: 0}
    })

    if (!updateRes.ok) {
        const failedData = await updateRes.json();
        return Response.json(failedData);
    }

    return Response.json({status: 'ok'});
}