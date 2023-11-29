import {FC} from "react";
import {FavClientWrapper} from "@/widgets/FavClientWrapper";
import {Metadata} from "next";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Избранное - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Добавляйте товары в избранное, чтобы не потерять.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="pb-12 pt-12 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto text-base">
            <h1 className="text-center text-xl font-montserrat font-semibold mb-[30px] md:text-2xl md:text-start">Избранное</h1>
            <FavClientWrapper/>
        </div>
    );
};

export default Page;