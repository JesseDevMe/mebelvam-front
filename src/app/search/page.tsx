import {FC} from "react";
import {SearchClientWrapper} from "@/widgets/SearchClientWrapper";
import {Metadata} from "next";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Поиск по названию товара - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Найдите нужный вам товар по названию.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold md:text-2xl md:text-start">Поиск</h1>
            <SearchClientWrapper/>
        </div>
    );
};

export default Page;