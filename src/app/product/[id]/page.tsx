import {FC} from "react";
import {fetchFurniture, Furniture} from "@/entities/Furniture";
import {CatalogRouter, Route} from "@/shared/CatalogRouter";
import {CardSlider} from "@/shared/Slider";
import {CardInfo} from "@/widgets/CardInfo";
import {CardSwitch} from "@/features/CardSwitch";
import {fetchStatic, StaticInf} from "@/entities/Static";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import dynamic from "next/dynamic";
import {StillQuestions} from "@/widgets/StillQuestions";

interface PageProps {
    params: { id: number }
}

export async function generateMetadata(
    { params }: PageProps,
): Promise<Metadata> {
    try {
        const furniture: Furniture = await fetchFurniture(params.id);
        return {
            title: furniture.name + ' - Мебель Вам',
            description: `${furniture.name} по выгодной цене в мебельном магазине Севастополя "Мебель Вам", у нас покупают мебель по низким ценам.`
        };
    } catch (error) {
        return {};
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    let furniture: Furniture;
    try {
        furniture = await fetchFurniture(params.id);
    } catch (e) {
        if (e instanceof Error && e.message === '404 Not Found') {
            notFound();
        } else {
            return (
            <div className="pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
                <p className="mt-5">
                    Не удалось загрузить страницу коллекции. Пожалуйста, попробуйте снова немного позже.
                    Мы уже заняты решением этой проблемы.
                </p>
            </div>
            );
        }
    }
    const staticInf: StaticInf = await fetchStatic();

    const routes: Route[] = [
        {
            name: furniture.subcategory.category.name,
            path: '/' + furniture.subcategory.category.slug + '-' + furniture.subcategory.category.id,
        },
        {
            name: furniture.subcategory.name,
            path: '/' + furniture.subcategory.slug + '-' + furniture.subcategory.id,
        },
        {
            name: furniture.name,
            path:'/product/' + furniture.id,
            isAbsolute: true,
        }
    ]


    return (
        <div className="pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full mx-auto">
            <div className="lg:mt-10 lg:mb-[55px]">
                <CatalogRouter
                routes={routes}
                />
            </div>

            <div className="flex flex-col gap-y-12 gap-x-7 lg:grid lg:grid-cols-2">
                <CardSlider imagesUrl={furniture.imagesUrl}/>
                <CardInfo furniture={furniture}/>
            </div>
            <div className="flex flex-col gap-12 mt-[50px] lg:flex-row justify-between">
                <div className="grow">
                    <CardSwitch
                    furniture={furniture}
                    />
                </div>
                <div className="flex gap-5 mx-auto lg:mx-0 lg:mt-[54px] lg:w-[300px] h-fit">
                    <StillQuestions telephone={staticInf.telephone}/>
                    <div
                        className="hidden md:flex flex-col gap-2.5 font-montserrat text-base text-center min-w-[220px] lg:hidden">
                        <div className="font-semibold py-7 px-5 border rounded-[5px] bg-fon">
                            Бесплатная доставка
                            <span className="font-normal block font-roboto">от 7000 руб.</span>
                        </div>
                        <div className="font-semibold py-7 px-5 border rounded-[5px] bg-fon">
                            Оплата при получении
                        </div>
                        <div className="font-semibold py-7 px-5 border rounded-[5px] bg-fon">
                            Эскиз кухни бесплатно
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;