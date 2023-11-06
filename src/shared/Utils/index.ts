import shuffle from "./ArrayShuffle";
import { getParamsString } from "./UrlParser";
import {routesSyncFavorites} from "./RouteHandlers";
import {addToFavorites, deleteFromFavorites, getFavorites , getCart, addToCart, deleteFromCart,
    deleteFromCartById, isItemInCart, isItemIdInCart} from "./LocalStorage";

export {shuffle, getParamsString, routesSyncFavorites, addToFavorites, deleteFromFavorites, getFavorites,
    getCart, addToCart, deleteFromCart, deleteFromCartById, isItemInCart, isItemIdInCart };