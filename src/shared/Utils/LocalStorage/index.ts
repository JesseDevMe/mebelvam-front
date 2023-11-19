//Favorites
import {CartItem} from "@/entities/Cart";

export function getFavorites(): number[] {
    let favString = localStorage.getItem('favorites');
    if (!favString || !favString.startsWith('[') || !favString.endsWith(']')) {
        favString = '[]';
    }
    return JSON.parse(favString);
}

export function addToFavorites(id: number) {
    const favString = localStorage.getItem('favorites');

    if (!favString || !favString.startsWith('[') || !favString.endsWith(']')) {
        return localStorage.setItem('favorites', JSON.stringify([id]));
    }

    const favorites: number[] = JSON.parse(favString);

    if (favorites.includes(id)) return;

    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function deleteFromFavorites(id: number) {
    const favString = localStorage.getItem('favorites');

    if (!favString || !favString.startsWith('[') || !favString.endsWith(']')) {
        return localStorage.setItem('favorites', JSON.stringify([]));
    }

    const favorites: number[] = JSON.parse(favString);

    if (!favorites.includes(id)) return;

    const newFav = favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(newFav));
}

//Cart
export function getCart(): CartItem[] {
    let cartString = localStorage.getItem('cart');
    if (!cartString || !cartString.startsWith('[') || !cartString.endsWith(']')) {
        cartString = '[]';
    }
    return JSON.parse(cartString);
}

export function isItemIdInCart(id: number): boolean {
    const cart = getCart();

    return cart.some((cartItem) =>
        (cartItem.id === id)
    )
}

export function isItemInCart(item: CartItem): boolean {
    const cart = getCart();

    return cart.some((cartItem) =>
            (cartItem.id === item.id) && (cartItem.variant_id === item.variant_id) &&
                (cartItem.attribute_id === item.attribute_id)
    )
}

export function addToCart(item: CartItem) {
    const cart: CartItem[] = getCart();

    if (cart.some((cartItem, index) => {
            if ((cartItem.id === item.id) && (cartItem.variant_id === item.variant_id) &&
            (cartItem.attribute_id === item.attribute_id)) {
                cart[index].count = item.count;
                localStorage.setItem('cart', JSON.stringify(cart));
                return true;
            }
        }
    )) return;

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
}

export function deleteFromCart(item: CartItem) {
    const cart: CartItem[] = getCart();

    const newCart = cart.filter((cartItem) => (cartItem.id !== item.id) || (cartItem.variant_id !== item.variant_id) ||
        (cartItem.attribute_id !== item.attribute_id))

    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
}

export function deleteFromCartById(id: number) {
    const cart: CartItem[] = getCart();
    const newCart = cart.filter((item) => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
}

export function deleteManyFromCart(items: CartItem[]) {
    const cart: CartItem[] = getCart();

    const newCart = cart.filter((cartItem) =>
        (!items.some(delItem => cartItem.attribute_id === delItem.attribute_id))  ||
        (!items.some(delItem => cartItem.variant_id === delItem.variant_id)) ||
        (!items.some(delItem => cartItem.id === delItem.id))
    )

    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
}