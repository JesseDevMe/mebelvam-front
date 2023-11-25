import {FC} from "react";
import {HotOffer} from "@/widgets/HotOffer";
import {fetchHotOffers, Offer} from "@/widgets/HotOffer/model";

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