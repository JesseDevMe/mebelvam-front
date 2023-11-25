import {FC} from "react";
import {CatalogRouter} from "@/shared/CatalogRouter";
import {CatalogGrid} from "@/widgets/CatalogGrid";
import {fetchCollections} from "@/entities/Collection/model";
import {CollectionCard} from "@/entities/Collection";

interface PageProps {

}

const Page: FC<PageProps> = async ({}) => {

    try {
        const collections = await fetchCollections();

        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20">
                <div className="lg:mt-10 lg:mb-[55px]">
                    <CatalogRouter
                        routes={[
                            {
                                name: 'Коллекции',
                                path: `/collections`
                            }
                        ]}
                    />
                </div>

                <CatalogGrid>
                    {collections.collections.map(collection =>
                        <CollectionCard
                            key={collection.id}
                            id={collection.id}
                            name={collection.name}
                            imageUrl={collection.imageUrl}
                        />
                    )}
                </CatalogGrid>
            </div>
        );
    } catch (e) {
        return (
            <div className="max-w-[1520px] w-full mx-auto bg-fon pb-12 pt-5 px-2.5 md:px-5 lg:px-10 xl:px-20">
                <div className="lg:mt-10 lg:mb-[55px]">
                    <CatalogRouter
                        routes={[
                            {
                                name: 'Коллекции',
                                path: `/collections`
                            }
                        ]}
                    />
                </div>

                <p>Не получилось загрузить страницу коллекций. Мы уже заняты решением этого вопроса.
                    Пожалуйста, попробуйте снова чуть позже.</p>
            </div>
        );
    }
};

export default Page;