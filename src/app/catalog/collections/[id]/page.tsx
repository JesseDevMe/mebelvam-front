import {FC} from "react";
import {CatalogRouter, Route} from "@/shared/CatalogRouter";
import {fetchCollection} from "@/entities/Collection";
import {CardSlider} from "@/shared/Slider";
import {FurnitureGrid} from "@/widgets/FurnitureGrid";
import {FurnitureCard} from "@/entities/FurnitureCard";

interface PageProps {
    params: {
        id: number,
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    const collection = await fetchCollection(params.id);

    const routes: Route[] = [
        {
            name: 'Коллекции',
            path: '/collections',
        },
        {
            name: collection.name,
            path:'/' + collection.id,
            // isAbsolute: true,
        }
    ]

    return (
        <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20">
            <div className="lg:mt-10 lg:mb-[55px]">
                <CatalogRouter
                    routes={routes}
                />
            </div>

            <div className="flex flex-col gap-y-12 gap-x-7 lg:grid lg:grid-cols-2">
                <CardSlider imagesUrl={collection.imagesUrl} aspect="4/3"/>
                <div className="flex flex-col gap-y-7">
                    <h1 className="font-montserrat text-base font-semibold md:text-xl">{collection.name}</h1>
                    <p>
                        {collection.description}
                    </p>

                    <div className="">
                        {(collection.materials && collection.materials.length > 0 ) &&
                            <p><span className="font-bold">Материал: </span>{collection.materials.join('/')}</p>}

                        {collection.manufacturer &&
                            <p className="mt-2.5"><span className="font-bold">Производитель: </span>{collection.manufacturer}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-[10px] mt-[50px] lg:mt-[80px]">
                <div className="flex justify-between">
                    <div className="font-montserrat font-semibold md:text-base lg:text-xl">Модули</div>
                    {/*<Sort/>*/}
                </div>
                <FurnitureGrid>
                    { collection &&
                        collection.modules.map((module) =>
                            <FurnitureCard
                                key={module.id}
                                id={module.id}
                                name={module.name}
                                price={module.price}
                                colors={module.colors}
                                sizes={module.sizes}
                                imagesUrl={module.imagesUrl}
                                firstVariantId={module.firstVariantId}
                                firstAttrId={module.firstAttrId}
                            />
                        )
                    }
                </FurnitureGrid>
            </div>
        </div>
    );
};

export default Page;