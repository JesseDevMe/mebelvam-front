

export async function routesSyncFavorites(ids: number[], token: string) {
    const res = await fetch('/api/user/favorites', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            ids: ids,
        })
    })

    if (!res.ok) {
        return Promise.reject("/api/user/favorites PUT error");
    }

    const data = await res.json();

    if (data.error || !data.ids) {
        return Promise.reject(data.error || 'push fetch error');
    }

    return data.ids;
}

export async function routesUpdateFavorites(ids: number[], token: string) {
    const res = await fetch('/api/user/favorites', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            ids: ids,
        })
    })

    if (!res.ok) {
        return Promise.reject("/api/user/favorites PATCH error");
    }

    const data = await res.json();

    if (data.error || !data.ids) {
        return Promise.reject(data.error || 'PATCH fetch error');
    }

    return data.ids;
}