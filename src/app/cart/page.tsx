import {FC} from "react";
import {CartClientWrapper} from "@/widgets/CartClientWrapper";
import {Metadata} from "next";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Корзина - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Добавляйте товары в корзину, чтобы не потерять.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">Корзина</h1>
            <div className="flex flex-col gap-7 lg:flex-row">
                <CartClientWrapper/>
            </div>
        </div>
    );
};

export default Page;