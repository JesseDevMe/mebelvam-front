import {METHOD} from "@/entities/Order/store/useOrderStore";

export interface OrderFurInfo {
    id: number;
    name: string;
    color: string;
    size: string;
    price: number;
    count: number;
}

export interface OrderInfo {
    furniture: OrderFurInfo[];
    method: METHOD;
    isLift: boolean;
    isSetup: boolean;
    customerName?: string;
    customerMiddleName?: string;
    customerTelephone: string;
    customerAddress: string;
    customerNote?: string;
}