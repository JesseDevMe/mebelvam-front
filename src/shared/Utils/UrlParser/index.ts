import {Params} from "@/entities/Furniture/model";


export function getParamsString(params: Params): string {
    let paramsString = '';
    if (params.page) {
        if (Array.isArray(params.page)) {
            paramsString += '&' + `pagination[page]=${params.page[0]}&pagination[pageSize]=25`
        } else paramsString += '&' + `pagination[page]=${params.page}&pagination[pageSize]=25`
    }

    return paramsString;
}