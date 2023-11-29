import {FC} from "react";
import {PromosClientWrapper} from "@/widgets/PromosClientWrapper";
import {Metadata} from "next";

interface PageProps {

}

export const metadata: Metadata = {
    title: 'Акции - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Акционные товары. Ловите самое выгодное предложение.',
}

const Page: FC<PageProps> = ({}) => {

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20">
           <PromosClientWrapper/>
        </div>
    );
};

export default Page;