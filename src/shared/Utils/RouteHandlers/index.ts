import {CartItem} from "@/entities/Cart";
import {getCart} from "@/shared/Utils";
import {UserData} from "@/entities/User";

//Favorites
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

    if (data.error) {
        if (data.error.status === 401) {
            return Promise.reject(401);
        }
        return Promise.reject(data.error.message || 'push fetch error');
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

    if (data.error) {
        if (data.error.status === 401) {
            return Promise.reject(401);
        }
        return Promise.reject(data.error.message || 'PATCH fetch error');
    }

    return data.ids;
}

//Cart
export async function routesUpdateCart(items: CartItem[], token: string): Promise<any> {
    const res = await fetch('/api/user/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(
            items
        )
    })

    if (!res.ok) {
        return Promise.reject("/api/user/cart PUT error");
    }

    const data = await res.json();

    if (data.error) {
        if (data.error.status === 401) {
            return Promise.reject(401);
        }
        return Promise.reject(data.error.message || 'PUT fetch error');
    }

    return data;
}

export async function routesSyncCart(items: CartItem[], token: string) {
    const userRes = await fetch('api/user/cart', {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })

    if (!userRes.ok) {
        return Promise.reject("/api/user/cart GET error");
    }

    const userData = await userRes.json();

    if (userData.error) {
        if (userData.error.status === 401) {
            return Promise.reject(401);
        }
        return Promise.reject(userData.error.message || "/api/user/cart GET error");
    }

    const userCart: CartItem[] = userData.cart;
    const LsCart = getCart();

    if (!userCart || userCart.length === 0) {
        const data = await routesUpdateCart(LsCart, token);
        return;
    }

    const uniqueUserCart = userCart.filter((userItem) =>
        !LsCart.some((LsItem) => LsItem.attribute_id === userItem.attribute_id)
    )
    LsCart.push(...uniqueUserCart);
    localStorage.setItem('cart', JSON.stringify(LsCart));

    const data = await routesUpdateCart(LsCart, token);

    return data;
}

//Me
export async function routesGetMe(token: string): Promise<UserData> {
    const res = await fetch('/api/user/me', {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });

    if (!res.ok) {
        return Promise.reject('routesGetMe fetch error');
    }

    const data = await res.json();

    if (data.error) {
        if (data.error.status === 401) {
            localStorage.removeItem('token');
            return Promise.reject(401);
        }

        return Promise.reject(data.error.message);
    }

    return data;
}

export async function routesUpdateMe(userData: UserData, token: string) {
    const res = await fetch('/api/user/me', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(userData)
    });

    if (!res.ok) {
        return Promise.reject('/api/user/me PUT fetch error');
    }

    const data = await res.json();

    if (data.error) {
        if (data.error.status === 401) {
            localStorage.removeItem('token');
            return Promise.reject(401);
        }
        return Promise.reject(data.error.message);
    }

    return data;
}