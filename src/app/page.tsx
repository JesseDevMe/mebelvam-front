import {Metadata} from "next";
import {FC} from "react";
import {Welcome} from "@/widgets/Welcome";
import {HotOffer} from "@/widgets/HotOffer";
import {Catalog} from "@/widgets/Catalog";
import {Feedback} from "@/widgets/Feedback";
import {AboutUs} from "@/widgets/AboutUs";
import {Consultation} from "@/widgets/Сonsultation";
export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Мебельный магазин мебель вам, купить мебель',
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {

  //   max-w-[1520px] w-full mx-auto
  return (
      <div>
          <Welcome/>
          <HotOffer/>
          <Catalog/>
          <Feedback/>
          <AboutUs/>
          <Consultation/>
      </div>
  );
};

export default Page;
