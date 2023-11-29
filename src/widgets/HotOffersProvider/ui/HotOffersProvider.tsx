import {FC} from "react";
import {fetchHotOffers, Offer} from "@/widgets/HotOffer/model";
import dynamic from "next/dynamic";

const HotOffer = dynamic(
    () => import('@/widgets/HotOffer/ui/HotOffer'),
);

interface HotOffersProviderProps {

}

const HotOffersProvider: FC<HotOffersProviderProps> = async ({}) => {
    let offers: Offer[] = [];
    try {
        offers = await fetchHotOffers();
    } catch (e) {

    }

    return (
        <div>
            <HotOffer offers={offers}/>
        </div>
    );
};

export default HotOffersProvider;