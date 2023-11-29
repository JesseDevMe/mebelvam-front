import {FC} from "react";
import {CrumbRouter} from "@/shared/CrumbRouter";
import {PartnerCard} from "@/entities/Partner";
import {fetchPartners} from "@/entities/Partner/model";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Сотрудничество - Мебель Вам',
    description: 'Мебельный магазин в Севастополе "Мебель Вам". Мы сотрудничаем с лучшими производителями мебели. У нас Вы можете заказать и купить недорого корпусную мебель ведущих производителей по самой низкой цене!',
}

interface PageProps {
}

const Page: FC<PageProps> = async ({}) => {
    try {
        const partners = await fetchPartners();

        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 px-2.5 md:px-5 lg:px-10 xl:px-20">
                <CrumbRouter
                    routes={[
                        {
                            name: 'Сотрудничество',
                            path: 'partners'
                        }
                    ]}
                />

                <h1 className="font-montserrat text-base font-semibold text-center max-w-[625px] mx-auto">
                    У нас Вы можете заказать и купить недорого корпусную мебель ведущих производителей по самой низкой цене!
                </h1>

                <p className="mt-[30px] font-montserrat text-base font-semibold text-center max-w-[625px] mx-auto">
                    Мы сотрудничаем с лучшими производителями мебели
                </p>

                <div className="flex flex-col gap-y-11 mt-[30px]">
                    {
                        partners.map((partner) =>
                            <PartnerCard
                                key={partner.name}
                                imageUrl={partner.imageUrl}
                                name={partner.name}
                                description={partner.description}
                            />
                        )
                    }

                </div>

            </div>
        );
    } catch (e) {
        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 px-2.5 md:px-5 lg:px-10 xl:px-20">
                <CrumbRouter
                    routes={[
                        {
                            name: 'Сотрудничество',
                            path: 'partners'
                        }
                    ]}
                />

                <p className="font-montserrat md:text-base font-semibold max-w-[625px] text-red-600">
                    Не удалось загрузить страницу. Пожалуйста, попробуйте снова. <br/> Не помогло? Тогда мы уже решаем этот вопрос.
                </p>
            </div>
        );
    }
};

export default Page;