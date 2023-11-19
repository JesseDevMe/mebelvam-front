import shuffle from "./ArrayShuffle";
import { getParamsString } from "./UrlParser";
import {routesSyncFavorites, routesUpdateCart, routesSyncCart} from "./RouteHandlers";
import {addToFavorites, deleteFromFavorites, getFavorites , getCart, addToCart, deleteFromCart,
    deleteFromCartById, isItemInCart, isItemIdInCart, deleteManyFromCart} from "./LocalStorage";

export {shuffle, getParamsString, routesSyncFavorites, addToFavorites, deleteFromFavorites, getFavorites,
    getCart, addToCart, deleteFromCart, deleteFromCartById, deleteManyFromCart, isItemInCart, isItemIdInCart, routesUpdateCart, routesSyncCart };