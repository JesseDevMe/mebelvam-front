import {FC} from "react";
import {Metadata} from "next";
import {MyClientWrapper} from "@/widgets/MyClientWrapper";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Личный Кабинет - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Личный кабинет.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">
                Личный кабинет
            </h1>
            <MyClientWrapper/>
        </div>
    );
};

export default Page;