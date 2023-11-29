import {FC} from "react";
import {OrderClientWrapper} from "@/widgets/OrderClientWrapper";
import {Metadata} from "next";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Оформление заказа - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Оформите заказ за пару кликов.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">
                Оформление заказа
            </h1>
            <div className="flex flex-col gap-7 lg:flex-row">
                <OrderClientWrapper/>
            </div>
        </div>
    );
};

export default Page;