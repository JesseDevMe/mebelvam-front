import {FC} from "react";
import {fetchStatic} from "@/entities/Static";

interface FailedOrderModalProps {

}

const FailedOrderModal: FC<FailedOrderModalProps> = async ({}) => {
    const staticInf = await fetchStatic();

    return (
        <>
            <h2 className="font-montserrat text-base font-semibold max-w-[300px] md:text-xl">При оформлении заказа произошла ошибка</h2>
            <div className="mt-7">
                <p>Пожалуйста, попробуйте позже</p>
                <p className="font-bold">или</p>
                <p>позвоните по номеру:</p>
            </div>
            <a className="font-montserrat text-base font-semibold max-w-[300px]" href={`tel:${staticInf.telephone}`}>{staticInf.telephone}</a>
            <p className="max-w-[300px]">Мы с радостью поможем вам оформить заказ</p>
        </>
    );
};

export default FailedOrderModal;