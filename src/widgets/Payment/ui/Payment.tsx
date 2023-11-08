import {FC, useState} from "react";
import wallet from "@/../public/Pages/Cart/wallet.svg";
import nb from "@/../public/Pages/Cart/NB.svg"
import Image from "next/image";


interface PaymentProps {

}

const Payment: FC<PaymentProps> = ({}) => {

    return (
        <div className="mt-[30px] border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] p-5">
            <p className="font-montserrat font-semibold text-xl">Оплата</p>
            <div className="mt-5 border border-dark rounded p-4 flex gap-x-2.5 items-center max-w-[380px]">
                <Image className="inline-block" src={wallet} alt=''/>
                <span  className="font-montserrat font-semibold text-base grow">
                    Наличными курьеру
                </span>
                <div className="relative group">
                    <Image className="inline-block" src={nb} alt=''/>
                    <div className="hidden group-hover:block p-7 bg-fon rounded absolute top-[130%] right-0 w-[300px] z-10 shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)]">
                        Оплата производится наличными деньгами, в момент получения заказа. Подтверждением вашей оплаты является фискальный кассовый чек, вручаемый во время получения и оплаты заказа.
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Payment;