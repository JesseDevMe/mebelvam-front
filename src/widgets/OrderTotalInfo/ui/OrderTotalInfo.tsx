import {FC} from "react";
import Link from "next/link";
import useOrderStore from "@/entities/Order/store/useOrderStore";
import {useFormContext} from "react-hook-form";
import {bool} from "prop-types";

interface OrderTotalInfoProps {

}

const OrderTotalInfo: FC<OrderTotalInfoProps> = ({}) => {
    const furnitures = useOrderStore(state => state.furnitures);
    const method = useOrderStore(state => state.method);
    const isLift = useOrderStore(state => state.isLift);
    const isSetup = useOrderStore(state => state.isSetup);

    const {
        trigger,
        getValues,
    } = useFormContext()

    function submitHandler() {
        trigger(undefined, {shouldFocus: true}).then((bool) => {
            if (bool) {
                console.log(getValues())
                console.log(method)
                console.log(isLift)
                console.log(isSetup)
            } else {
                console.log('Ne val')
            }
        });

    }

    return (
        <div className="border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-[30px] lg:min-w-[350px]">
            <div
                onClick={submitHandler}
                className="block cursor-pointer rounded bg-dark py-4 text-center text-light font-montserrat text-base font-semibold"
            >
                Оформить заказ
            </div>
            <div className="mt-7">
                <div className="flex justify-between font-montserrat font-semibold ">
                    <span className="text-base">Количество товаров:</span>
                    <span>{furnitures.reduce((result, cur) => result + cur.count, 0)} шт.</span>
                </div>

                <div className="flex justify-between mt-6 font-roboto">
                    <span className="">Сумма скидки:</span>
                    <p className="">{furnitures.reduce((result, cur) => {
                        if (cur.oldPrice) {
                            return result + (cur.oldPrice - cur.price) * cur.count;
                        } else {
                            return result;
                        }
                    }, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>

                <div className="border-y-2 py-2.5 mt-3.5 text-[#666666]">
                    Стоимость заказа указана без учета доставки
                </div>

                <div className="flex justify-between mt-2 font-montserrat font-semibold text-xl">
                    <span>Итого:</span>
                    <p>{furnitures.reduce((result, cur) => result + cur.price * cur.count, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>
            </div>
        </div>
    );
};

export default OrderTotalInfo;